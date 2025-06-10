import { NavigationIndependentTree } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "./Main/HomePage";
import Calculator from "./Main/Calculator";
import LogFood from "./Main/LogFood";

import { MainProvider } from "../contexts/MainContext";
import { useMain } from "../contexts/MainContext";
import { StyleProvider } from "../contexts/StyleContext";
import { useState } from "react";
import HomeStack from "./Main/HomeStack";
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <MainProvider>
      <StyleProvider>
        <NavigationIndependentTree>
          <TabNavigatorContent />
        </NavigationIndependentTree>
      </StyleProvider>
    </MainProvider>
  );
}

function TabNavigatorContent() {
  const { tabBarStatus, setTabBarStatus } = useMain(); // Now inside MainProvider's tree

  const tabBarVisibility = tabBarStatus ? {} : { display: "none" };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Calculator":
              iconName = focused ? "calculator" : "calculator-outline";
              break;
            case "Log Food":
              iconName = focused ? "fast-food" : "fast-food-outline";
              break;
            case "Workout":
              iconName = focused ? "walk" : "walk-outline";
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "black",
          height: 100,
          display: tabBarStatus ? "" : "none", // Dynamically hide/show tab bar
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Calculator" component={Calculator} />
      <Tab.Screen name="Log Food" component={LogFood} />
      
    </Tab.Navigator>
  );
}
