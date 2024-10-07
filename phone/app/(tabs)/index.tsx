import React, { useState } from 'react';
import { Image, StyleSheet, Platform, Button, View, Modal, TextInput, TouchableOpacity, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isSameDay } from 'date-fns';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';

interface Event {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  isAllDay: boolean;
  description: string;
  location: string;
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventStartTime, setEventStartTime] = useState(new Date());
  const [eventEndTime, setEventEndTime] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); 
  const [isAllDay, setIsAllDay] = useState(false);

{/* Function for Saving an Event */}
const handleSave = () => {
  if (eventName === '') {
    alert('Event name is required.');
    return;
  }

  if (eventEndTime < eventStartTime) {
    alert('End datetime must be after start datetime.');
    return;
  }

  // Create the new event object
  const newEvent: Event = {
      id: `${new Date().getTime()}`, 
      name: eventName,
      description: eventDescription,
      location: eventLocation,
      startTime: isAllDay ? new Date(eventStartTime.setHours(0, 0, 0, 0)) : eventStartTime,
      endTime: isAllDay ? new Date(eventEndTime.setHours(23, 59, 59, 999)) : eventEndTime,
      isAllDay: isAllDay,
    };
    
    setEvents([...events, newEvent]);
    setModalVisible(false);
    setEventName('');
    setEventDescription('');
    setEventLocation('');
    setIsAllDay(false);
  };

{/* Function for Deleting an Event */}
const handleDelete = () => {
    if (selectedEvent) {
      Alert.alert(
        'Confirm Delete',
        `Are you sure you want to delete "${selectedEvent.name}"?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Delete cancelled'),
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              const updatedEvents = events.filter((event) => event.id !== selectedEvent.id);
              setEvents(updatedEvents);
              setSelectedEvent(null);
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      alert('Error: No event selected'); // Handle case where no event is selected
    }
  };
  
// Function to format the event date and time for display
const formatDate = (date: Date) => format(date, 'EEE, d MMM');
const formatTime = (date: Date) => format(date, 'h:mm a');

const sortedEvents = [...events].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

// Group events by date
const groupedEvents = sortedEvents.reduce((acc: { [key: string]: Event[] }, event) => {
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);

  // Iterate through each date from start to end
  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateString = formatDate(new Date(d));
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push({ ...event });
  }

  return acc;
}, {});

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Day 'n Knight</ThemedText>
        <HelloWave />
      </ThemedView>
  
      {/* Render Grouped Events */}
      <View style={styles.eventsContainer}>
        {Object.entries(groupedEvents).map(([date, events]) => (
          <View key={date} style={styles.dateSection}>
            <ThemedText style={styles.dateText}>{date}</ThemedText>
            <View style={styles.lineSeparator} />
            {events.map((event, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedEvent(event)} style={styles.eventCard}>
                <ThemedText style={styles.eventText}>{event.name}</ThemedText>
                <ThemedText style={styles.eventText}>
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
  
      {/* Circular Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for Adding Event */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
          <ThemedText type="title" style={[styles.modalText, styles.headingText]}>Create a New Event</ThemedText>
            
            {/* Event Name Input */}
            <TextInput
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
              style={styles.input}
              placeholderTextColor="#999"
            />

            <View>
              {/* All Day Switch */}
              <View style={styles.switchContainer}>
                <ThemedText style={styles.modalText}>All Day</ThemedText>
                <Switch
                  value={isAllDay}
                  onValueChange={(value) => setIsAllDay(value)}
                />
              </View>

              {/* Row for Start Date and Start Time */}
              <View style={styles.rowContainer}>
                {/* Start Date Picker on the left */}
                <View style={styles.pickerContainer}>
                  <ThemedText style={styles.modalText}>Start Date</ThemedText>
                  <DateTimePicker
                    value={eventStartTime}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      const currentDate = selectedDate || eventStartTime;
                      setEventStartTime(currentDate);
                    }}
                  />
                </View>

                {/* Start Time Picker on the right (if not all-day) */}
                {!isAllDay && (
                  <View style={styles.pickerContainer}>
                    <ThemedText style={styles.modalText}>Start Time</ThemedText>
                    <DateTimePicker
                      value={eventStartTime}
                      mode="time"
                      display="default"
                      onChange={(event, selectedTime) => {
                        const currentTime = selectedTime || eventStartTime;
                        setEventStartTime(currentTime);
                      }}
                    />
                  </View>
                )}
              </View>

              {/* Row for End Date and End Time */}
              <View style={styles.rowContainer}>
                {/* End Date Picker on the left */}
                <View style={styles.pickerContainer}>
                  <ThemedText style={styles.modalText}>End Date</ThemedText>
                  <DateTimePicker
                    value={eventEndTime}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      const currentDate = selectedDate || eventEndTime;
                      setEventEndTime(currentDate);
                    }}
                  />
                </View>

                {/* End Time Picker on the right (if not all-day) */}
                {!isAllDay && (
                  <View style={styles.pickerContainer}>
                    <ThemedText style={styles.modalText}>End Time</ThemedText>
                    <DateTimePicker
                      value={eventEndTime}
                      mode="time"
                      display="default"
                      onChange={(event, selectedTime) => {
                        const currentTime = selectedTime || eventEndTime;
                        setEventEndTime(currentTime);
                      }}
                    />
                  </View>
                )}
              </View>
            </View>


            {/* Other input fields (Description, Location) */}
            <TextInput
              placeholder="Description"
              value={eventDescription}
              onChangeText={setEventDescription}
              style={styles.input}
              placeholderTextColor="#999"
            />
            <TextInput
              placeholder="Location"
              value={eventLocation}
              onChangeText={setEventLocation}
              style={styles.input}
              placeholderTextColor="#999"
            />

            {/* Save and Cancel buttons */}
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
  
        {/* Modal for Displaying Event Details */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedEvent}
          onRequestClose={() => setSelectedEvent(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              {selectedEvent && (
                <>
                  <ThemedText type="title" style={styles.modalText}>
                    {selectedEvent.name}
                  </ThemedText>

                  <ThemedText style={styles.modalText}>
                    {selectedEvent.isAllDay ? (
                      isSameDay(selectedEvent.startTime, selectedEvent.endTime) ? (
                        `${format(selectedEvent.startTime, 'EEEE, MMMM d, yyyy')}`
                      ) : (
                        `${format(selectedEvent.startTime, 'EEEE, MMMM d, yyyy')} - ${format(selectedEvent.endTime, 'EEEE, MMMM d, yyyy')}`
                      )
                    ) : (
                      isSameDay(selectedEvent.startTime, selectedEvent.endTime) ? (
                        `${format(selectedEvent.startTime, 'EEEE, MMMM d, yyyy')} ${formatTime(selectedEvent.startTime)} - ${formatTime(selectedEvent.endTime)}`
                      ) : (
                        `${format(selectedEvent.startTime, 'EEEE, MMMM d, yyyy')} ${formatTime(selectedEvent.startTime)} - ${format(selectedEvent.endTime, 'EEEE, MMMM d, yyyy')} ${formatTime(selectedEvent.endTime)}`
                      )
                    )}
                  </ThemedText>

                  <ThemedText style={styles.modalText}>
                    Location: {selectedEvent.location}
                  </ThemedText>
                  <ThemedText style={styles.modalText}>
                    Description: {selectedEvent.description}
                  </ThemedText>

                  <View style={styles.buttonRow}>
                  <Button title="Delete" onPress={handleDelete} />
                  <Button title="Edit" onPress={() => {}} />
                    <Button title="Close" onPress={() => setSelectedEvent(null)} />
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 20,
  },
  eventsContainer: {
    marginTop: 20,
    gap: 20,
  },
  dateSection: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lineSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  eventCard: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  eventText: {
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '##000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Space out date and time pickers
    marginBottom: 10,
  },
  pickerContainer: {
    flex: 1, // Take equal space for both date and time pickers
    marginHorizontal: 5, // Add some horizontal spacing
    alignItems: 'center', // Center the text and picker
  },

  headingText: {
    color: '##000000', // Change this to your preferred color
    fontWeight: 'bold', // Optional: make the heading bold
    fontSize: 24,       // Optional: adjust font size
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF', // Change to your preferred color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  
});
