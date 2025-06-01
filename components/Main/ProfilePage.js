import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useMain } from "../../contexts/MainContext";
import { useStyles } from "../../contexts/StyleContext";
import { useState, useRef } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

export default function ProfilePage({ navigation, route }) {
  const {
    setTabBarStatus,
    firstName,
    lastName,
    currentHeight,
    age,
    currentWeight,
    activityLevel,
  } = useMain();
  const { styles } = useStyles();

  function firestoreTimestampToDate(timestamp) {
    if (!timestamp || typeof timestamp.seconds !== "number") {
      throw new Error("Invalid Firestore timestamp.");
    }

    // Convert seconds to milliseconds and add nanoseconds converted to milliseconds
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
    return new Date(milliseconds);
  }

  const newAge = firestoreTimestampToDate(age);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.viewAfterSafeArea, { flex: 1 }]}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View></View>

          <Image
            style={styles.topLogo}
            source={require("../../assets/1-removebg-preview.png")}
          />

          <View></View>
        </View>
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              setTabBarStatus(true);
            }}
          >
            <Image source={require("../../assets/ProArrow.png")} />
          </TouchableOpacity>

          <View style={{ paddingTop: 25 }}>
            <Text
              style={{
                fontSize: 36,
                fontFamily: "Reddit Sans",
                fontWeight: "bold",
              }}
            >
              Profile
            </Text>
          </View>

          <View
            style={{
              paddingTop: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 250,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Reddit Sans",
                }}
              >
                First Name:
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Reddit Sans",
                  color: "#4A90FF",
                  fontWeight: "bold",
                }}
              >
                {firstName}
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingTop: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 250,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Reddit Sans",
                }}
              >
                Last Name:
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Reddit Sans",
                  color: "#4A90FF",
                  fontWeight: "bold",
                }}
              >
                {lastName}
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingTop: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 250,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Reddit Sans",
                }}
              >
                Height:
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Reddit Sans",
                  color: "#4A90FF",
                  fontWeight: "bold",
                }}
              >
                {currentHeight}cm
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingTop: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 250,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Reddit Sans",
                }}
              >
                Date of Birth:
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Reddit Sans",
                  color: "#4A90FF",
                  fontWeight: "bold",
                }}
              >
                {newAge.getDate()}/{newAge.getMonth() + 1}/
                {newAge.getFullYear()}
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingTop: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 250,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Reddit Sans",
                }}
              >
                Weight:
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Reddit Sans",
                  color: "#4A90FF",
                  fontWeight: "bold",
                }}
              >
                {currentWeight}kg
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingTop: 20,
            }}
          >
            <View
              style={{
                width: 300,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Reddit Sans",
                }}
              >
                Activity Level:
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Reddit Sans",
                  color: "#4A90FF",
                  fontWeight: "bold",
                }}
              >
                {activityLevel}
              </Text>
            </View>
          </View>
          <View style={{ padding: 10, paddingTop: 20, paddingLeft: 0 }}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                width: 50,
                alignItems: "center",
                backgroundColor: "#4A90FF",
              }}
              onPress={() => {
                navigation.navigate("Edit");
                setTabBarStatus(false);
              }}
            >
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontSize: 20,
                  fontWeight: "bold",
                  padding: 5,
                  color: "#fff",
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
