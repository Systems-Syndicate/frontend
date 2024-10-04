import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DailyView from './(hamburger)/daily_view';
import CreateEvent from './(hamburger)/create_event';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function headerRight() {
  return (        
  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <Icon name="search-outline" style={styles.headerRight}/>
    <Icon name="calendar-clear-outline" style={styles.headerRight}/>
  </View>
  )
}


const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <Drawer.Navigator initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          drawerType: "front", 
          headerLeft: () => (
            <Icon
              name="menu"
              size={28}
              color="white" 
              style={{ marginLeft: 16 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => (
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 16}}>
                  <Icon name="search-outline" style={{color: "white", fontSize: 24, marginRight: 16}}/>
                  <Icon name="calendar-clear-outline" style={{color: "white", fontSize: 24,}}/>
              </View>
          ),
          drawerIcon: ({ color, size }) => (
            <Icon name="calendar" size={size} color="blue" /> // Change color here
          ),
          drawerStyle: {
            backgroundColor: 'lightblue',
            width: 240,
          },
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          }
        })}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          <Drawer.Screen name="DailyView" component={DailyView} />
          <Drawer.Screen name="CreateEvent" component={CreateEvent} />
      </Drawer.Navigator>
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