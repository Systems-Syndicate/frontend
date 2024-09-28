import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

export default function TimeSlot({ style, item, dayIndex, daysTotal }) {
    // Helper function to format the time
    const formatTime = (date) => moment(date).format('h:mm A');

    return (
        <View
            style={[
                style,  // Keep the passed styles intact
                timeSlotStyles.container,
                { backgroundColor: item.color },  // Use dynamic background color from the item
            ]}
        >
            {/* Center the content vertically and horizontally */}
            <View style={timeSlotStyles.centeredContent}>
                <Text style={timeSlotStyles.title}>{item.title}</Text> {/* Event Name */}
                {/* <Text style={timeSlotStyles.subtitle}>{item.name}</Text> User's Name */}
            </View>
        </View>
    );
}

const timeSlotStyles = StyleSheet.create({
    container: {
        borderRadius: 10,
        elevation: 5,
        padding: 10,
        justifyContent: 'center',  // Vertically center content
        alignItems: 'center',      // Horizontally center content
    },
    centeredContent: {
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#fff',
    },
    time: {
        fontSize: 12,
        color: '#fff',
    },
    dayIndex: {
        fontSize: 10,
        color: '#fff',
        marginTop: 10,
    },
});
