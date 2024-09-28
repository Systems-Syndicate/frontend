import React, { useState } from "react";
import moment from "moment";
import Timetable from "react-native-calendar-timetable";
import { ScrollView, Button, View, Modal, TextInput, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import TimeSlot from "./class";  // Assuming TimeSlot is a custom component you use to render each time block.
import { v4 as uuidv4 } from 'uuid';  // Use UUID for unique keys

// Predefined colors associated with users
const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6"]; // Reduced to four colors

// Add User Button Component
const AddUserButton = ({ onPress }) => (
    <View>
        <Button title="Add User" onPress={onPress} />
    </View>
);

// Modal Component for Inputting User Names
const UserInputModal = ({ visible, onClose, onSave }) => {
    const [userName, setUserName] = useState('');

    const handleSave = () => {
        if (userName) {
            onSave(userName);
            setUserName('');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter Your Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your Name"
                        value={userName}
                        onChangeText={setUserName}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSave}
                    >
                        <Text style={styles.buttonText}>Add User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={onClose}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// Modal Component for Inputting Time Slot Data
const TimeSlotModal = ({ visible, onClose, onSave, userNames }) => {
    const [selectedName, setSelectedName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [eventName, setEventName] = useState('');

    const handleSave = () => {
        if (startTime && endTime && selectedName && eventName) {
            onSave(startTime, endTime, selectedName, eventName);
            setStartTime('');
            setEndTime('');
            setSelectedName('');
            setEventName('');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Select Your Name</Text>
                    <FlatList
                        data={userNames}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => setSelectedName(item)}>
                                <Text style={styles.nameItem}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Start Time (HH:mm)"
                        keyboardType="numeric"
                        value={startTime}
                        onChangeText={setStartTime}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="End Time (HH:mm)"
                        keyboardType="numeric"
                        value={endTime}
                        onChangeText={setEndTime}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Event Name"
                        value={eventName}
                        onChangeText={setEventName}
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSave}
                        >
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// Timetable View Component
const TimetableView = ({ items }) => (
    <Timetable
        items={items}
        renderItem={props => (
            <TimeSlot {...props} />
        )}
        date={new Date()}
    />
);

// Main App Component
export default function App() {
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [userModalVisible, setUserModalVisible] = useState(false);
    const [userNames, setUserNames] = useState([]);  // Track users
    const [userColors, setUserColors] = useState({});  // Track colors assigned to users

    const addUser = (name) => {
        if (!userNames.includes(name)) {
            setUserNames(prevNames => [...prevNames, name]);
        }
        setUserModalVisible(false);
    };

    const addTimeSlot = (startTime, endTime, name, eventName) => {
        const startDate = moment(startTime, 'HH:mm').toDate();
        const endDate = moment(endTime, 'HH:mm').toDate();
        
        // Determine the column index based on the user's index
        const userIndex = userNames.indexOf(name);
        const columnIndex = userIndex % colors.length;  // Modulo to stay within color bounds

        const newTimeSlot = {
            id: uuidv4(),  // Ensure unique ID for each event
            title: eventName,
            startDate: startDate,
            endDate: endDate,
            color: colors[columnIndex], // Use the color based on the user's index
            name: name,
        };

        setItems(prevItems => [...prevItems, newTimeSlot]);
        setModalVisible(false);
    };

    return (
        <ScrollView>
            <AddUserButton onPress={() => setUserModalVisible(true)} />
            <Button title="Add Event" onPress={() => setModalVisible(true)} disabled={userNames.length === 0} />
            <TimetableView items={items} />
            <UserInputModal
                visible={userModalVisible}
                onClose={() => setUserModalVisible(false)}
                onSave={addUser}
            />
            <TimeSlotModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={addTimeSlot}
                userNames={userNames}
            />
        </ScrollView>
    );
}

// Styles
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: "100%"
    },
    nameItem: {
        padding: 10,
        fontSize: 16,
        textAlign: "center"
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    button: {
        backgroundColor: "#2196F3",
        borderRadius: 5,
        padding: 10,
        width: "45%",
        alignItems: "center"
    },
    cancelButton: {
        backgroundColor: "#f44336"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    }
});
