import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Define the type for the day parameter
interface Day {
    dateString: string;
    year: number;
    month: number;
    day: number;
}

const MyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');

    const onDayPress = (day: Day) => {
        setSelectedDate(day.dateString);
    };

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={onDayPress}
                markedDates={{
                    [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' }
                }}
            />
            {selectedDate ? (
                <Text style={styles.selectedDateText}>
                    Selected Date: {selectedDate}
                </Text>
            ) : (
                <Text style={styles.selectedDateText}>Select a date</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDateText: {
        marginTop: 20,
        fontSize: 18,
    },
});

export default MyCalendar;
