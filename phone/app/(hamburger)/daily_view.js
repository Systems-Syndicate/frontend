import { StyleSheet, View, Text, ScrollView, SafeAreaView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DailyView() {
    return (
        <SafeAreaView>
            {/* <View style={styles.header}>
                <View style={styles.headerBar}>
                    <Icon name="menu-outline" style={styles.hamburger}> 
                    </Icon>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Icon name="search-outline" style={styles.headerRight}/>
                        <Icon name="calendar-clear-outline" style={styles.headerRight}/>
                    </View>
                </View>                
            </View> */}

            <View style={styles.body}>
                <Text style={{flexDirection: 'row', textAlign: 'center', fontSize: 24, color: 'white', margin: 4, marginBottom: 16}}> SEPT </Text>

                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.text}> Mon </Text>
                        <View style={{flexDirection: 'column'}}>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 26 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 2 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 9 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 16 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 23 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 30 </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.text}> Tue </Text>
                        <View style={{flexDirection: 'column'}}>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 27 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 3 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 10 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 17 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 24 </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.text}> Wed </Text>
                        <View style={{flexDirection: 'column'}}>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 28 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 4 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 11 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 18 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 25 </Text>
                            </View>
                        </View>
                    </View>


                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.text}> Thu </Text>
                        <View style={{flexDirection: 'column'}}>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 29 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 5 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 12 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 19 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 26 </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.text}> Fri </Text>
                        <View style={{flexDirection: 'column'}}>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 30 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 6 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 13 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 20 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 27 </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.text}> Sat </Text>
                        <View style={{flexDirection: 'column'}}>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 31 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 7 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 14 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 21 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 28 </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.text}> Sun </Text>
                        <View style={{flexDirection: 'column'}}>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 1 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 8 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 15 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 22 </Text>
                            </View>
                            <View style={styles.daycontainers}>
                                <Text style={styles.text}> 29 </Text>
                            </View>
                        </View>
                    </View>
                    
                </View>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({  
    header: {
        paddingTop: 48,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'black',
    },
    headerBar: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        // backgroundColor: 'blue',
    },
    hamburger: {
        margin: 12,
        marginBottom: 0,
        fontSize: 24,
        color: "white",
    },
    headerRight: {
        margin: 12,
        marginBottom: 0,
        fontSize: 24,
        color: "white",
    },
    body: {
        backgroundColor: 'black',
        padding: 16
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: 'white',
        textAlign: 'center'
    },
    daycontainers: {
        paddingTop: 4, 
        paddingBottom: 48
    }
});