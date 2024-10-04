import { StyleSheet, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function DailyView() {
    return (
        <SafeAreaView>
            <ThemedView style={styles.body}>
                <ThemedText style={{flexDirection: 'row', textAlign: 'center', fontSize: 24, margin: 4, marginBottom: 16}}> SEPT </ThemedText>

                <ThemedView style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <ThemedView style={{flexDirection: 'column'}}>
                        <ThemedText style={styles.text}> Mon </ThemedText>
                        <ThemedView style={{flexDirection: 'column'}}>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 26 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 2 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 9 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 16 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 23 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 30 </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>

                    <ThemedView style={{flexDirection: 'column'}}>
                        <ThemedText style={styles.text}> Tue </ThemedText>
                        <ThemedView style={{flexDirection: 'column'}}>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 27 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 3 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 10 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 17 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 24 </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>

                    <ThemedView style={{flexDirection: 'column'}}>
                        <ThemedText style={styles.text}> Wed </ThemedText>
                        <ThemedView style={{flexDirection: 'column'}}>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 28 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 4 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 11 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 18 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 25 </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>


                    <ThemedView style={{flexDirection: 'column'}}>
                        <ThemedText style={styles.text}> Thu </ThemedText>
                        <ThemedView style={{flexDirection: 'column'}}>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 29 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 5 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 12 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 19 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 26 </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>

                    <ThemedView style={{flexDirection: 'column'}}>
                        <ThemedText style={styles.text}> Fri </ThemedText>
                        <ThemedView style={{flexDirection: 'column'}}>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 30 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 6 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 13 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 20 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 27 </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>

                    <ThemedView style={{flexDirection: 'column'}}>
                        <ThemedText style={styles.text}> Sat </ThemedText>
                        <ThemedView style={{flexDirection: 'column'}}>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 31 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 7 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 14 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 21 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 28 </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>

                    <ThemedView style={{flexDirection: 'column'}}>
                        <ThemedText style={styles.text}> Sun </ThemedText>
                        <ThemedView style={{flexDirection: 'column'}}>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 1 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 8 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 15 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 22 </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.daycontainers}>
                                <ThemedText style={styles.text}> 29 </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                    
                </ThemedView>
                </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({  
    header: {
        paddingTop: 48,
        paddingLeft: 8,
        paddingRight: 8,
        // backgroundColor: 'black',
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
        // color: "white",
    },
    headerRight: {
        margin: 12,
        marginBottom: 0,
        fontSize: 24,
        // color: "white",
    },
    body: {
        // backgroundColor: 'black',
        padding: 16
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        // color: 'white',
        textAlign: 'center'
    },
    daycontainers: {
        paddingTop: 4, 
        paddingBottom: 48
    }
});