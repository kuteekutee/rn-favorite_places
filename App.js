import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as SplashScreen from "expo-splash-screen";

import Map from "./screens/Map";
import { init, populatePlace } from "./util/database";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import WelcomeScreen from "./screens/WelcomeScreen";
import InfoScreen from "./screens/InfoScreen";
import IconButton from "./UI/IconButton";
import { Colors } from "./constants/colors";
import PlaceDetails from "./screens/PlaceDetails";

// Keep the splash screen visible while initializing database
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [dbInit, setDbInit] = useState(false);

  function MyStacks() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary200 },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: Colors.gray700 },
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            title: "Favorite Places",
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="add-circle-outline"
                size={30}
                color="#fff"
                onPress={() => navigation.navigate("AddPlace")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{
            title: "Add A Place Favorite",
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            title: "Map location",
          }}
        />
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{ title: "Fetching Place ..." }}
        />
      </Stack.Navigator>
    );
  }

  useEffect(() => {
    init()
      .then(() => {
        setDbInit(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInit) {
      await SplashScreen.hideAsync();
    }
  }, [dbInit]);

  if (!dbInit) {
    return null;
  }

  return (
    <>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary200 },
              headerTintColor: "#fff",
              contentStyle: { backgroundColor: Colors.gray700 },
              tabBarActiveTintColor: Colors.primary800,
              tabBarInactiveTintColor: Colors.gray700,
            }}
          >
            <Tab.Screen
              name="Home"
              component={WelcomeScreen}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="MyStack"
              component={MyStacks}
              options={{
                tabBarLabel: "My Places",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="list" color={color} size={size} />
                ),
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Info"
              component={InfoScreen}
              options={{
                tabBarLabel: "Info",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="md-information" color={color} size={size} />
                ),
                headerShown: true,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>

      <StatusBar style="dark" />
    </>
  );
}
