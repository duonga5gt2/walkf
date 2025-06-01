import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useStyles } from "../../contexts/StyleContext";
import { useMain } from "../../contexts/MainContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LogFoodFront from "./foodStack/LogFoodFront";
import LogFoodSecond from "./foodStack/LogFoodSecond";

const Stack = createNativeStackNavigator();

export default function LogFood(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="First"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="First" component={LogFoodFront} />
        <Stack.Screen name="Second" component={LogFoodSecond} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
