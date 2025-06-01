import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Welcome } from "./components/Welcome";
import { LogIn } from "./components/LogIn";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { SignUp } from "./components/SignUp";
import { WFSignUp } from "./components/WFSignUp";
import MainPage from "./components/MainPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import BodyMeasure from "./components/BodyMeasure";
import { useState } from "react";
import VerifyPage from "./components/VerifyPage";
import { MainProvider } from "./contexts/MainContext";
import ForgetPassword from "./components/ForgetPassword";
import TabNavigator from "./components/MainPage";
import "react-native-gesture-handler";
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Reddit Sans": require("./font/RedditSans-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
    else SplashScreen.preventAutoHideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Prevent rendering until fonts load
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

function AppNavigator() {
  const { currentUser, isEmailVerified, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <View>
          <Image source={require("./assets/1-removebg-preview.png")} />
        </View>
        <ActivityIndicator size="large" color="black"></ActivityIndicator>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {currentUser ? (
        <>
          {isEmailVerified ? null : (
            <Stack.Screen name="VerifyPage" component={VerifyPage} />
          )}
          <Stack.Screen name="MainPage" component={TabNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={LogIn} />
          <Stack.Screen name="WFSignUp" component={WFSignUp} />
          <Stack.Screen name="BodyMeasure" component={BodyMeasure} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
