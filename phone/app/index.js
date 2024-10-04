import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DailyView from './(hamburger)/daily_view';
import CreateEvent from './(hamburger)/create_event';
import Icon from 'react-native-vector-icons/Ionicons';

import { useCallback, useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

import { StatusBar } from 'expo-status-bar';
import { ThemedView } from '@/components/ThemedView';



function HomeScreen({ navigation }) {
  return (
    <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </ThemedView>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </ThemedView>
  );
}

const Drawer = createDrawerNavigator();


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar backgroundColor={colorScheme === 'dark' ? 'black' : 'white'} hidden={false}/>
      <Drawer.Navigator initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerStatusBarHeight: 4,
          drawerType: "front", 
          headerLeft: () => (
            <Icon
              name="menu"
              size={28}
              color={colorScheme === 'dark' ? 'white' : DefaultTheme}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => (
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 16}}>
                  <Icon name="search-outline" style={{color: colorScheme === 'dark' ? 'white' : DefaultTheme, fontSize: 24, marginRight: 16}}/>
                  <Icon name="calendar-clear-outline" style={{color: colorScheme === 'dark' ? 'white' : DefaultTheme, fontSize: 24,}}/>
              </View>
          ),
          drawerIcon: ({ color, size }) => (
            <Icon name="calendar" size={size} color={colorScheme === 'dark' ? 'white' : DefaultTheme}/> 
          ),
          drawerStyle: {
            width: 240,
          },
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? DarkTheme : 'lightblue',
          },
          headerTitleStyle: {
            color: colorScheme === 'dark' ? 'white' : DefaultTheme,
          }
        })}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          <Drawer.Screen name="DailyView" component={DailyView} />
          <Drawer.Screen name="CreateEvent" component={CreateEvent} />
      </Drawer.Navigator>
    </ThemeProvider>
  );
}

