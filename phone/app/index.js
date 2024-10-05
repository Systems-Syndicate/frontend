import { useEffect, useState } from 'react';
import { Button, View, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import DailyView from './(hamburger)/daily_view';
import MonthlyView from './(hamburger)/monthly_view';
import CreateEvent from './(hamburger)/create_event';
import GetDimensions from './(hamburger)/get_dimensions';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

function HomeScreen({ route, navigation }) {

  const { dimensions } = route.params;

  return (
    <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => {
          navigation.navigate('Notifications', {dimensions});
        }}
        title="Go to notifications"
      />
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

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
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
      <StatusBar backgroundColor={colorScheme === 'dark' ? 'black' : 'white'} hidden={false} animated={true} />
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
          <Drawer.Screen name="Home" component={HomeScreen} initialParams={{ dimensions }} />
          <Drawer.Screen name="Notifications" component={GetDimensions} initialParams={{ dimensions }} />
          <Drawer.Screen name="DailyView" component={DailyView} />
        <Drawer.Screen name="MonthlyView" component={MonthlyView} initialParams={{ dimensions }} />
          <Drawer.Screen name="CreateEvent" component={CreateEvent} />
      </Drawer.Navigator>
    </ThemeProvider>
  );
}

