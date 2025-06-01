import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import EditPage from "./EditPage";
import Settings from "./Settings";

const Stack = createNativeStackNavigator();

// 🔹 Stack Navigator for HomePage
export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen name="Edit" component={EditPage} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
