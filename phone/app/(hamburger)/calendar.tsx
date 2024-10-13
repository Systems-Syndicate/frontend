import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Calendar } from 'react-native-calendars';

const backendURL = "http://172.16.10.240:3801/events/123456";

const CalendarScreen = () => {

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(backendURL);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    console.log("run ok")
                }
                const data = await response.json();
                const convertUTCToAEST = (date: Date) => {
                    const utcDate = new Date(date);
                    const aestDate = new Date(utcDate.getTime() + 10 * 60 * 60 * 1000);

                    return aestDate;
                };

                const fetchedEvents = data.map(event => ({ // No error, still runs all good :)
                    uid: event.uid,
                    name: event.name,
                    startTime: convertUTCToAEST(event.begin),
                    endTime: convertUTCToAEST(event.end),
                    description: event.description,
                    location: event.location,
                    isAllDay: false // TODO: change this to true if the event is all-day
                }));

                console.log(123, fetchedEvents)


                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
                alert('There was a problem fetching events.');
            }
        };

        fetchEvents();

        console.log(1, events);
    }, []);


    const scheme = useColorScheme(); // Get the current theme (light or dark)
    // Define dynamic styles based on the theme
    const backgroundColor = scheme === 'dark' ? 'black' : 'white';
    const textColor = scheme === 'dark' ? 'white' : 'black';


    return (
        <View style={styles.container}>
            <Calendar
                markedDates={events} // TODO: retrieve dates with events
                markingType={'multi-dot'}  // Shows multiple dots under a date (for multiple events)
                onDayPress={(day: any) => {
                    console.log('Selected day', day);
                }}

                theme={{
                    backgroundColor: 'black',
                    calendarBackground: backgroundColor,
                    textSectionTitleColor: textColor,
                    dayTextColor: textColor, // Day numbers text color
                    todayTextColor: 'red', // Color for today
                    selectedDayBackgroundColor: 'pink',
                    selectedDayTextColor: '#ffffff',
                    arrowColor: 'red', // Color of the arrows
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default CalendarScreen;
