import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DailyView from './(hamburger)/daily_view';
import CreateEvent from './(hamburger)/create_event';
import Icon from 'react-native-vector-icons/Ionicons';

import { useCallback, useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';


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

const Drawer = createDrawerNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
      <Drawer.Navigator initialRouteName="Home"
        onLayout={onLayoutRootView}
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

