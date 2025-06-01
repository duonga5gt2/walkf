import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { useMain } from "../../contexts/MainContext";
import { useStyles } from "../../contexts/StyleContext";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CalculatorFront from "./calculatorStackElement/CalculatorFront";
import CalculatorSecond from "./calculatorStackElement/CalculatorSecond";
import SDActivity from "./calculatorStackElement/SDActivity";
import SDFood from "./calculatorStackElement/SDFood";
import SDResult from "./calculatorStackElement/SDResult";
import SDBMR from "./calculatorStackElement/SDBMR";
const Stack = createNativeStackNavigator();
const InnerStack = createNativeStackNavigator();

function SDStack({ navigation, route }) {
  const { largerNavigation } = route.params;
  return (
    <InnerStack.Navigator
      initialRouteName="BMR"
      screenOptions={{ headerShown: false }}
    >
      <InnerStack.Screen name="BMR" component={SDBMR} />
      <InnerStack.Screen name="Activity" component={SDActivity} />
      <InnerStack.Screen name="Food" component={SDFood} />
      <InnerStack.Screen
        name="Result"
        component={SDResult}
        initialParams={{ largerNavigation, smallNavigation: navigation }}
      />
    </InnerStack.Navigator>
  );
}

export default function Calculator({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Front"
      >
        <Stack.Screen
          name="Front"
          component={CalculatorFront}
          initialParams={{ largerNavigation: navigation }}
        />
        <Stack.Screen name="Second" component={CalculatorSecond} />
        <Stack.Screen
          name="SDStack"
          component={SDStack}
          initialParams={{ largerNavigation: navigation }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
