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
  Platform,
  Alert,
} from "react-native";
import { useMain } from "../../contexts/MainContext";
import { useStyles } from "../../contexts/StyleContext";
import { useState, useRef } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Timestamp } from "firebase/firestore";
import { updateUserProfile, updateChartData } from "../persistence/persistence";
import { useAuth } from "../../contexts/AuthContext";

export default function EditPage({ navigation, route }) {
  const {
    setTabBarStatus,
    firstName,
    lastName,
    currentHeight,
    age,
    currentWeight,
    activityLevel,
    updateUserData,
    setLoading,
    fetchUserData,
  } = useMain();
  const { styles } = useStyles();

  const { currentUser } = useAuth();

  function firestoreTimestampToDate(timestamp) {
    if (!timestamp || typeof timestamp.seconds !== "number") {
      throw new Error("Invalid Firestore timestamp.");
    }

    // Convert seconds to milliseconds and add nanoseconds converted to milliseconds
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
    return new Date(milliseconds);
  }

  const newAge = firestoreTimestampToDate(age);

  const [fName, setFName] = useState(firstName);
  const [lName, setLName] = useState(lastName);
  const [h, setH] = useState(currentHeight);
  const [dob, setDOB] = useState(firestoreTimestampToDate(age));
  const [w, setW] = useState(currentWeight);
  const [actLevel, setActLevel] = useState(activityLevel);

  const [actInput, setActInput] = useState(false);

  const [error, setError] = useState(null); // ✅ Ensure error is initialized

  const updateProfile = async () => {
    if (!fName || !lName || !h || !w) {
      setError("Cannot update empty fields!"); // ✅ 'error' exists now
      return;
    }

    let updates = {};

    if (fName !== firstName) updates.firstName = fName;
    if (lName !== lastName) updates.lastName = lName;

    const parsedHeight = parseFloat(h);
    if (
      !isNaN(parsedHeight) &&
      parsedHeight > 0 &&
      parsedHeight !== currentHeight
    ) {
      const heightDiff = Math.abs(parsedHeight - currentHeight);
      if (heightDiff >= 20) {
        Alert.alert(
          "Significant Height Change Detected",
          `Your height change is ${heightDiff}cm. Are you sure you want to update?`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Proceed",
              onPress: async () => {
                updates.height = parsedHeight;
                finalizeUpdate(updates);
              },
            },
          ]
        );
        return;
      } else {
        updates.height = parsedHeight;
      }
    }

    const parsedWeight = parseFloat(w);
    if (
      !isNaN(parsedWeight) &&
      parsedWeight > 0 &&
      parsedWeight !== currentWeight
    ) {
      const weightDiff = Math.abs(parsedWeight - currentWeight);
      if (weightDiff >= 20) {
        Alert.alert(
          "Significant Weight Change Detected",
          `Your weight change is ${weightDiff}kg. Are you sure you want to update?`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Proceed",
              onPress: async () => {
                updates.weight = parsedWeight;
                finalizeUpdate(updates);
              },
            },
          ]
        );
        return;
      } else {
        updates.weight = parsedWeight;
      }
    }

    if (dob.getTime() !== firestoreTimestampToDate(age).getTime()) {
      updates.age = Timestamp.fromDate(dob);
    }

    if (actLevel !== activityLevel) updates.activityLevel = actLevel;

    if (Object.keys(updates).length === 0) {
      console.log("NO change");
      return;
    }

    finalizeUpdate(updates);
  };

  const finalizeUpdate = async (updates) => {
    try {
      setLoading(true);
      await updateUserProfile(currentUser.uid, updates);
      if (updates.weight) {
        await updateChartData(currentUser.uid, updates.weight);
      }
      await fetchUserData();
      console.log("Profile updated:", updates);
      navigation.goBack();
      setTabBarStatus(true);
    } catch (e) {
      console.error("Error updating profile:", e);
      setError("Error updating profile. Please try again."); // ✅ Now error is properly handled
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  };

  // Default to current date
  const [show, setShow] = useState(false); // Controls visibility of the picker
  const [isDateSelected, setIsDateSelected] = useState(false);

  const today = new Date();
  const maxAgeDate = new Date(
    today.getFullYear() - 120,
    today.getMonth(),
    today.getDate()
  );
  const onChange = (event, selectedDate) => {
    // Close the picker
    if (selectedDate) {
      setDOB(selectedDate); // Update the selected date
      setIsDateSelected(true); // Mark date as selected
    }
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      id: "1",
      label:
        "Sedentary - Spend most of the day sitting (e. g. bankteller, desk job)",
      value: "Sedentary",
    },
    {
      id: "2",
      label:
        "Lightly Active - Spend a good part of the day on your feet (e. g. teacher, salesperson)",
      value: "Lightly Active",
    },
    {
      id: "3",
      label:
        "Moderately Active - Spend a good part of the day doing some physical acitivty (e. g. food server, postal carrier)",
      value: "Moderately Active",
    },
    {
      id: "4",
      label:
        "Very Active - Spend most of the day doing heavy physical activity (e. g. bike messenger, carpenter)",
      value: "Very Active",
    },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.value);
    setActLevel(option.value);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                Edit
              </Text>
            </View>

            <View>
              <Text style={{ color: "red", fontFamily: "Reddit Sans" }}>
                {error}
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Reddit Sans",
                }}
              >
                First Name:
              </Text>
              <TextInput
                value={fName}
                onChangeText={setFName}
                style={{
                  fontSize: 17,
                  fontFamily: "Reddit Sans",
                  color: "#4A90FF",

                  borderBottomWidth: 1,
                  borderBottomColor: "#000",
                  paddingHorizontal: 5,
                  width: 200, // Ensure input has enough space
                }}
              />
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Reddit Sans",
                }}
              >
                Last Name:
              </Text>
              <TextInput
                value={lName}
                onChangeText={setLName}
                style={{
                  fontSize: 17,
                  fontFamily: "Reddit Sans",
                  color: "#4A90FF",

                  borderBottomWidth: 1,
                  borderBottomColor: "#000",
                  paddingHorizontal: 5,
                  width: 200, // Ensure input has enough space
                }}
              />
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Reddit Sans",
                }}
              >
                Height (cm):
              </Text>
              <TextInput
                keyboardType="numeric"
                value={String(h)}
                onChangeText={(value) => {
                  if (/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
                    setH(value);
                  }
                }}
                style={{
                  fontSize: 17,
                  fontFamily: "Reddit Sans",
                  color: "#4A90FF",

                  borderBottomWidth: 1,
                  borderBottomColor: "#000",
                  paddingHorizontal: 5,
                  width: 200, // Ensure input has enough space
                }}
              />
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Reddit Sans",
                }}
              >
                Date of Birth:
              </Text>
              <View
                style={{
                  width: 200,
                  paddingHorizontal: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: "#000",
                }}
              >
                <TouchableOpacity onPress={() => setShow(!show)}>
                  <Text
                    style={{
                      color: "#4A90FF",
                      fontFamily: "Reddit Sans",
                      fontSize: 17,
                    }}
                  >
                    {dob.getDate()}/{dob.getMonth() + 1}/{dob.getFullYear()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {show && (
              <DateTimePicker
                value={dob}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChange}
                minimumDate={maxAgeDate}
                maximumDate={new Date()} // Restrict future dates
              />
            )}

            <View
              style={{
                paddingTop: 20,
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
                Weight (kg):
              </Text>
              <TextInput
                keyboardType="numeric"
                value={String(w)}
                style={{
                  fontSize: 17,
                  fontFamily: "Reddit Sans",
                  color: "#4A90FF",

                  borderBottomWidth: 1,
                  borderBottomColor: "#000",
                  paddingHorizontal: 5,
                  width: 200,
                }}
                onChangeText={(value) => {
                  // Allow up to 3 digits before the dot & up to 2 decimal places
                  if (/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
                    setW(value);
                  }
                }}
              />
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Reddit Sans",
                }}
              >
                Activity Level:
              </Text>
              <TouchableOpacity
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#000",
                  paddingHorizontal: 5,
                  width: 200,
                }}
                onPress={() => {
                  setActInput(!actInput);
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "Reddit Sans",
                    color: "#4A90FF",
                  }}
                >
                  {actLevel}
                </Text>
              </TouchableOpacity>
            </View>

            {!actInput ? null : (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  paddingTop: 20,
                }}
              >
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      {
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        alignItems: "flex-start",
                      },
                      selectedOption === option.value && {
                        backgroundColor: "black", // Highlighted background color
                      },
                    ]}
                    onPress={() => handleOptionClick(option)}
                  >
                    <View>
                      <Text
                        style={[
                          { fontFamily: "Reddit Sans" },
                          selectedOption === option.value && {
                            color: "#fff",
                          },
                        ]}
                      >
                        {option.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                width: "30%",
                borderRadius: 10,
                height: 38,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
              onPress={updateProfile}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Reddit Sans",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Finish
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
