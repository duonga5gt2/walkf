import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { useMain } from "../../contexts/MainContext";
import { useStyles } from "../../contexts/StyleContext";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import LineChartComponent from "./elements/LineChart";
import { Button } from "react-native";
import { collection } from "firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";
import { updateChartData } from "../persistence/persistence";

export default function HomePage({ navigation }) {
  const { logout, currentUser } = useAuth();
  const {
    loading,
    firstName,
    lastName,
    calories,
    distance,
    pace,
    calculatedAge,
    setCalculatedAge,
    currentWeight,
    setCurrentWeight,
    currentHeight,
    createdAt,
    dateLabel,
    progress,
    gender,
    activityLevel,
    updateUserData,
    setLoading,
    getUser,
    fetchUserData,
    setTabBarStatus,
  } = useMain();
  const { styles } = useStyles();

  const [weight, setWeight] = useState("");

  const updateWeight = async () => {
    if (weight) {
      const w = parseFloat(weight) || 0;
      if (w !== 0) {
        const weightDiff = Math.abs(w - currentWeight); // Calculate difference

        // If weight change is >= 20kg, ask for confirmation
        if (weightDiff >= 20) {
          Alert.alert(
            "Significant Weight Change Detected",
            `Your weight change is ${weightDiff}kg. Are you sure you want to update?`,
            [
              { text: "Cancel", style: "cancel" }, // Do nothing
              {
                text: "Proceed",
                onPress: async () => {
                  await handleWeightUpdate(w);
                },
              },
            ]
          );
        } else {
          // If weight difference is small, update immediately
          await handleWeightUpdate(w);
        }
      } else {
        Alert.alert("Unexpected error", "Cannot update data");
      }
    } else {
      Alert.alert("Cannot be left empty");
    }
  };

  // 🔹 Function to Handle Weight Update After Confirmation
  const handleWeightUpdate = async (w) => {
    try {
      setLoading(true);
      await updateUserData("weight", w);
      toggleModal();
      await updateChartData(currentUser.uid, w);
      await fetchUserData();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const Bmr = (gender, weight, height, age) => {
    if (gender) {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    }

    return 10 * weight + 6.25 * height - 5 * age - 161;
  };

  const Tdee = (gender, weight, height, age, activityLevel) => {
    const bmr = Bmr(gender, weight, height, age);
    if (activityLevel === "Sedentary") {
      return bmr * 1.2;
    } else if (activityLevel === "Lightly Active") {
      return bmr * 1.375;
    } else if (activityLevel === "Moderately Active") {
      return bmr * 1.55;
    } else if (activityLevel === "Very Active") {
      return bmr * 1.9;
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
        <ActivityIndicator size="large" color="black"></ActivityIndicator>
      </View>
    );
  }

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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProfilePage");
            }}
          >
            <Ionicons name="person-circle-outline" size={40} color="#4169E1" />
          </TouchableOpacity>

          <Image
            style={styles.topLogo}
            source={require("../../assets/1-removebg-preview.png")}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Settings");
              setTabBarStatus(false);
            }}
          >
            <Ionicons name="settings-outline" size={30} color="#4169E1" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingTop: 19,
                }}
              >
                Current Body Measurement
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: "#d9d9d9",
                  padding: 6,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 20,
                  marginTop: 19,
                }}
                onPress={() => toggleModal()}
              >
                <Text style={{ fontFamily: "Reddit Sans", fontSize: 13 }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 20,
                alignItems: "center",
                width: "100%",
                padding: 20,
                height: 142,
                backgroundColor: "#d3d3d3",
                borderRadius: 10,
              }}
            >
              <View
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  <Ionicons name="scale-outline" size={20} color="#FF7F50" />
                  <Text style={{ fontFamily: "Reddit Sans" }}>
                    {currentWeight}kg
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  <Ionicons name="man-outline" size={20} color="#00FFFF" />
                  <Text style={{ fontFamily: "Reddit Sans" }}>
                    {currentHeight}cm
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  <Text style={{ color: "#9C27B0", fontFamily: "Reddit Sans" }}>
                    Age
                  </Text>
                  <Text style={{ fontFamily: "Reddit Sans" }}>
                    {calculatedAge}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Reddit Sans",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  TDEE
                </Text>
                <Text
                  style={{
                    fontFamily: "Reddit Sans",
                    fontSize: 32,
                    color: "#FF0004",
                  }}
                >
                  {Tdee(
                    gender,
                    currentWeight,
                    currentHeight,
                    calculatedAge,
                    activityLevel
                  ).toFixed(0)}
                  <Text
                    style={{
                      fontFamily: "Reddit Sans",
                      fontSize: 14,
                      color: "black",
                    }}
                  >
                    kcal
                  </Text>
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Reddit Sans",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  BMR
                </Text>
                <Text
                  style={{
                    fontFamily: "Reddit Sans",
                    fontSize: 32,
                    color: "#FF0004",
                  }}
                >
                  {Bmr(
                    gender,
                    currentWeight,
                    currentHeight,
                    calculatedAge
                  ).toFixed(0)}
                  <Text
                    style={{
                      fontFamily: "Reddit Sans",
                      color: "black",
                      fontSize: 14,
                    }}
                  >
                    kcal
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          {/* <LineChartComponent progress={progress} /> */}
        </ScrollView>

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View
              style={{
                backgroundColor: "#fff",
                width: 300,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Reddit Sans",
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingBottom: 10,
                  }}
                >
                  Update your weight progress
                </Text>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <Text style={{ fontFamily: "Reddit Sans" }}>Weight (kg)</Text>
              <TextInput
                keyboardType="numeric"
                value={weight}
                placeholder="weight"
                style={{
                  borderBottomWidth: 1,
                  padding: 10,
                  marginBottom: 20,
                }}
                onChangeText={(value) => {
                  // Allow up to 3 digits before the dot & up to 2 decimal places
                  if (/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
                    setWeight(value);
                  }
                }}
                onBlur={() => {
                  // Ensure value is formatted to 2 decimal places when leaving input
                  if (weight) {
                    setWeight(parseFloat(weight).toFixed(2));
                  }
                }}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: "#000",
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={updateWeight}
              >
                <Text
                  style={{
                    color: "#fff",
                    alignSelf: "center",
                    fontFamily: "Reddit Sans",
                    fontWeight: "bold",
                  }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
