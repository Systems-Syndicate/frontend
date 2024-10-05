import { StyleSheet, SafeAreaView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function DailyView() {
    return (
        <SafeAreaView>
            <ThemedView style={styles.body}>

                <ThemedView style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <ThemedView style={{flexDirection: 'column'}}>
                        <ThemedText style={styles.text}> Wed </ThemedText>
                    </ThemedView>
                </ThemedView>
                <View style={{ flex: 2 }}>
                    <View style={{ flex: 0.5, borderBottomColor: 'white', borderBottomWidth: 2 }} />
                </View>
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({  
    body: {
        // backgroundColor: 'black',
        padding: 16
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        // color: 'white',
        textAlign: 'center',
        paddingBottom: 4
    },
});