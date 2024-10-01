import React, { useState } from 'react';
import { Image, StyleSheet, Platform, Button, View, Modal, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'; // Import date-fns for formatting dates

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Swipeable } from 'react-native-gesture-handler';


// Define the Event type
interface Event {
  id: string; // Unique identifier
  name: string; // Event name
  startTime: Date; // Start time
  endTime: Date; // End time
  description: string; // Event description
  location: string; // Event location
}

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventStartTime, setEventStartTime] = useState(new Date());
  const [eventEndTime, setEventEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // State for selected event details

  const handleSave = () => {
    const newEvent: Event = {
      id: `${new Date().getTime()}`, // Unique ID
      name: eventName,
      description: eventDescription,
      location: eventLocation,
      startTime: eventStartTime,
      endTime: eventEndTime,
    };

    setEvents([...events, newEvent]);
    // Reset input fields
    setModalVisible(false);
    setEventName('');
    setEventDescription('');
    setEventLocation('');
  };

  // Function to format the event date and time for display
  const formatDate = (date: Date) => format(date, 'EEE, d MMM');

  // Function to format time for display
  const formatTime = (date: Date) => format(date, 'h:mm a');

  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  // Group events by date
  const groupedEvents = sortedEvents.reduce((acc: { [key: string]: Event[] }, event) => {
    const dateString = formatDate(event.startTime);
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(event);
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
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Day N Knight</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <Button title="Add a New Event" onPress={() => setModalVisible(true)} />
      </View>

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

      {/* Modal for Adding Event */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ThemedText type="title" style={styles.modalText}>Create Event</ThemedText>
            <TextInput
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
              style={styles.input}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <ThemedText style={styles.modalText}>{eventStartTime.toLocaleString()}</ThemedText>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={eventStartTime}
                mode="datetime"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || eventStartTime;
                  setShowDatePicker(false);
                  setEventStartTime(currentDate);
                  setEventEndTime(new Date(currentDate.getTime() + 3600000)); // Set end time to 1 hour later
                }}
              />
            )}

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
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal for Viewing Event Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedEvent}
        onRequestClose={() => setSelectedEvent(null)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {selectedEvent && (
              <>
                <ThemedText type="title" style={styles.modalText}>{selectedEvent.name}</ThemedText>
                <ThemedText style={styles.modalText}>Description: {selectedEvent.description}</ThemedText>
                <ThemedText style={styles.modalText}>Location: {selectedEvent.location}</ThemedText>
                <ThemedText style={styles.modalText}>
                  Time: {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                </ThemedText>
                <Button title="Close" onPress={() => setSelectedEvent(null)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
});
