import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../contexts/AuthContext";
import { useMain } from "../../../contexts/MainContext";
import { useStyles } from "../../../contexts/StyleContext";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";

export default function CalculatorFront({ navigation, route }) {
  const { styles } = useStyles();
  const { setTabBarStatus, curCalScreen, setCurCalScreen } = useMain();
  const { largerNavigation } = route.params;

  const boxItem = [
    {
      title: "Lean Body Mass",
      description:
        "Calculates the fat-free mass in your body, including muscles, bones, and organs. It's critical for tracking muscle mass changes during fat loss or bulking.",
    },
    {
      title: "BMR & TDEE",
      description:
        "BMR estimates the calories your body burns at rest for essential functions, while TDEE adjusts for activity level to calculate total daily calorie needs.",
    },
    {
      title: "Activity Calorie",
      description:
        "Calculates energy expenditure for specific activities based on their intensity (MET value), weight, and duration.",
    },
    {
      title: "Thermal Effect of Food",
      description:
        "Estimates calories burned during digestion, with TEF values of 20-30% for protein, 5-10% for carbs, and 0-3% for fats.",
    },
    {
      title: "Calories Surplus/Deficit",
      description:
        "Determines whether you’re in a caloric surplus (positive) for muscle gain or a deficit (negative) for fat loss.",
    },
  ];

  const handleTouch = (buttonName) => {
    navigation.navigate("Second", { largerNavigation, name: buttonName });
    setCurCalScreen("Instruction");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={[styles.viewAfterSafeArea, { flex: 1 }]}>
        <View style={styles.topLogoNotHomePage}>
          <View></View>
          <Image
            style={styles.topLogo}
            source={require("../../../assets/1-removebg-preview.png")}
          />
          <View></View>
        </View>
        <Text style={styles.title}>Calculator</Text>
        <View style={[{ paddingTop: 33 }, styles.boxContainer]}>
          {boxItem.map((box) => {
            return (
              <TouchableOpacity
                key={box.title}
                style={styles.boxCalculator}
                onPress={() => handleTouch(box.title)}
              >
                <Text style={styles.boxTitle}>{box.title}</Text>
                <Text style={styles.boxDes}>{box.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
