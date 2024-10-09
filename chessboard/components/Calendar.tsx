import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  CalendarList,
  CalendarProvider,
  WeekCalendar,
  TimelineList,
  TimelineProps,
  CalendarUtils,
} from "react-native-calendars";

const { width, height } = Dimensions.get("window");
const BOARD_SIZE = Math.min(width, height); // Ensure board is smaller than the screen size

const INITIAL_TIME = { hour: 9, minutes: 0 };

// Define types for Event and EventsByDate
interface Event {
  color: string;
  end: string;
  id: string;
  location: string;
  start: string;
  summary: string;
  title: string;
  user: string;
}

interface EventsByDate {
  [key: string]: Event[];
}

const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch("http://localhost:3801/events/123456");
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const parseEventsToMarkedDates = (events: Event[]) => {
  const markedDates: {
    [key: string]: {
      dots: { key: string; color: string; selectedDotColor: string }[];
    };
  } = {};

  events.forEach((event) => {
    const { color, end, id, location, start, summary, title, user } = event;
    const eventDate = start.split(" ")[0];
    const dot = {
      key: user, // Use user as the key to avoid duplicates for the same user
      color: color || "gray",
      selectedDotColor: color || "gray",
    };

    if (!markedDates[eventDate]) {
      markedDates[eventDate] = { dots: [] };
    }

    // Check if the user is already marked for that date
    const isUserAlreadyMarked = markedDates[eventDate].dots.some(
      (d) => d.key === user
    );

    // If not already marked, add the dot
    if (!isUserAlreadyMarked) {
      markedDates[eventDate].dots.push(dot);
    }
  });
  console.log(markedDates);

  return markedDates;
};

// Function to parse the time from a string
const parseDateToTimeString = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};

// Function to group events by their date
const groupEventsByDate = (events: Event[]): EventsByDate => {
  return events.reduce<EventsByDate>((acc, event) => {
    const dateString = CalendarUtils.getCalendarDateString(event.start);
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(event);
    return acc;
  }, {});
};

const CalendarTimelineComponent: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
      setLoading(false);
    };

    loadEvents();
  }, []);

  // Update markedDates whenever events are updated
  useEffect(() => {
    const newMarkedDates = parseEventsToMarkedDates(events);
    setMarkedDates(newMarkedDates);
    console.log(markedDates);
  }, [events]);

  const eventsByDate = groupEventsByDate(events);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDay(day.dateString);
    setCurrentDate(day.dateString);
  };

  const handleBackToCalendar = () => {
    setSelectedDay(null);
  };

  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const timelineProps: Partial<TimelineProps> = {
    format24h: true,
    scrollToFirst: true,
    initialTime: INITIAL_TIME,
    unavailableHours: [
      { start: 0, end: 6 },
      { start: 22, end: 24 },
    ],
    onEventPress: handleEventPress,
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {selectedDay ? (
        <View style={styles.timelineContainer}>
          <Button title="Back to Calendar" onPress={handleBackToCalendar} />
          <CalendarProvider date={currentDate} showTodayButton>
            <WeekCalendar firstDay={1} />
            <TimelineList
              events={eventsByDate}
              timelineProps={timelineProps}
              showNowIndicator
              scrollToFirst
            />
          </CalendarProvider>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedEvent?.title}</Text>
                <Text>
                  {parseDateToTimeString(selectedEvent?.start || "")} -{" "}
                  {parseDateToTimeString(selectedEvent?.end || "")}
                </Text>
                <Text>{selectedEvent?.summary || "No summary available."}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <CalendarList
          pastScrollRange={6}
          futureScrollRange={12}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={true}
          current={new Date().toISOString().split("T")[0]}
          style={styles.calendar}
          calendarWidth={BOARD_SIZE}
          calendarHeight={BOARD_SIZE}
          onDayPress={handleDayPress}
          markingType={"multi-dot"}
          markedDates={markedDates} // Use updated markedDates
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  timelineContainer: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
  calendar: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
});

export default CalendarTimelineComponent;
