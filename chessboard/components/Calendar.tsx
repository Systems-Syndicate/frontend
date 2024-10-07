import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
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
  id: string;
  start: string;
  end: string;
  title: string;
  color?: string;
  user: string;
  summary?: string;
}

interface EventsByDate {
  [key: string]: Event[];
}

// Mock events directly in the component
const EVENTS: Event[] = [
  {
    id: "1",
    start: "2024-10-08T09:00:00",
    end: "2024-10-08T10:00:00",
    title: "Event 1",
    color: "pink",
    user: "user1",
  },
  {
    id: "5",
    start: "2024-10-08T09:00:00",
    end: "2024-10-08T10:00:00",
    title: "Event 2321",
    summary: "This is a summary of the event as a test",
    color: "#3677FF",
    user: "user2",
  },
  {
    id: "6",
    start: "2024-10-08T09:00:00",
    end: "2024-10-08T10:00:00",
    title: "Event 6969",
    color: "orange",
    user: "user3",
  },
  {
    id: "2",
    start: "2024-10-08T11:00:00",
    end: "2024-10-08T12:00:00",
    title: "Event 2",
    color: "pink",
    user: "user1",
  },
  {
    id: "3",
    start: "2024-10-09T09:00:00",
    end: "2024-10-09T10:00:00",
    title: "Event 3",
    user: "user1",
  },
];

const parseEventsToMarkedDates = (events: Event[]) => {
  const markedDates: {
    [key: string]: {
      dots: { key: string; color: string; selectedDotColor: string }[];
    };
  } = {};

  events.forEach((event) => {
    const { start, color, title, user } = event;
    const eventDate = start.split("T")[0];
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

  const eventsByDate = groupEventsByDate(EVENTS);

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
          markedDates={parseEventsToMarkedDates(EVENTS)}
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
