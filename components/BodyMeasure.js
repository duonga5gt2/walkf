import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../contexts/AuthContext";
import { errorMessage } from "../errorMessage";
import { addUser } from "./persistence/persistence";

function BodyMeasure({ navigation, route }) {
  const [ageInput, setAgeInput] = useState(true); //True if the block, false if the scroll
  const [weightInput, setWeightInput] = useState(true); //True if the block, false if the scroll
  const [heightInput, setHeightInput] = useState(true); //True if the block, false if the scroll
  const [activityInput, setActivityInput] = useState(true); //True if the block, false if the scroll

  const [gender, setGender] = useState(true);
  const [age, setAge] = useState(route.params.date);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");

  const isValidBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi >= 10 && bmi <= 60; // Include edge cases for special groups
  };

  const weightList = [];
  const heightList = [];

  for (let j = 10; j <= 500; j++) {
    weightList.push(`${j}`);
  }

  for (let k = 50; k <= 250; k++) {
    heightList.push(`${k}`);
  }

  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setActivityLevel(option.value);
  };

  const { firstName, lastName, email, password } = route.params;

  const { signup } = useAuth();

  const handleSubmit = async () => {
    if (age && height && weight && activityLevel) {
      const heightFloat = parseFloat(height);
      const weightFloat = parseFloat(weight);
      if (!isValidBMI(weightFloat, heightFloat)) {
        Alert.alert("Please enter realistic biometric data");
      } else {
        try {
          setLoading(true);
          const userCred = await signup(email, password);
          await addUser(
            userCred.user.uid,
            firstName,
            lastName,
            age,
            gender,
            heightFloat,
            weightFloat,
            activityLevel
          );
        } catch (error) {
          const userFriendlyMessage =
            errorMessage[error.code] || "An unexpected error occurred.";
          Alert.alert(userFriendlyMessage); // Display the error to the user
        } finally {
          setLoading(false);
        }
      }
    } else {
      Alert.alert("Please fill in the empty field");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 2 }}>
            <View style={{ padding: 30 }}>
              <View style={styles.picContainer}>
                <Image
                  style={styles.pic}
                  source={require("../assets/1-removebg-preview.png")}
                />
              </View>

              <TouchableOpacity
                style={{ padding: 10, width: 40 }}
                onPress={() => navigation.goBack()}
              >
                <Image source={require("../assets/Arrow 1.png")} />
              </TouchableOpacity>

              <View style={{ paddingBottom: 50 }}>
                <Text
                  style={{
                    fontFamily: "Reddit Sans",
                    fontWeight: "bold",
                    fontSize: 36,
                  }}
                >
                  Body Measurement
                </Text>

                <View style={{ marginTop: 10 }}>
                  <Text style={styles.label}>Gender</Text>
                  <TouchableOpacity
                    onPress={() => setGender(true)}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      marginTop: 10,
                      width: 150,
                    }}
                  >
                    <View
                      style={{
                        width: 24, // Diameter of the circle
                        height: 24, // Diameter of the circle
                        borderRadius: 12, // Half of the width or height
                        borderWidth: 1,
                        backgroundColor: gender ? "black" : "white",
                      }}
                    ></View>
                    <Text
                      style={[
                        styles.label,
                        { fontWeight: "regular", marginLeft: 10 },
                      ]}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setGender(false)}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      marginTop: 10,
                      width: 150,
                    }}
                  >
                    <View
                      style={{
                        width: 24, // Diameter of the circle
                        height: 24, // Diameter of the circle
                        borderRadius: 12, // Half of the width or height
                        borderWidth: 1,
                        backgroundColor: !gender ? "black" : "white",
                      }}
                    ></View>
                    <Text
                      style={[
                        styles.label,
                        { fontWeight: "regular", marginLeft: 10 },
                      ]}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.container}>
                  {/* Age, Weight, and Height */}
                  <View style={styles.row}>
                    {/* Age */}

                    {/* Weight */}
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Weight (kg)</Text>
                      <View style={styles.pickerContainer}>
                        <TouchableOpacity
                          style={{
                            borderWidth: !weightInput ? 0 : 1,

                            padding: 10,
                            borderRadius: 10,
                            marginTop: 10,
                            width: 100,
                            backgroundColor: !weightInput ? "#bfbfbf" : "none",
                          }}
                          onPress={() => {
                            setWeightInput(!weightInput);
                            setAgeInput(true);
                            setHeightInput(true);
                            setActivityInput(true);
                          }}
                        >
                          {weight ? (
                            <Text
                              style={{
                                fontFamily: "Reddit Sans",
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            >
                              {weight}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: "Reddit Sans",
                                fontSize: 12,
                              }}
                            >
                              Select Weight
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Height */}
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Height (cm)</Text>
                      <View style={styles.pickerContainer}>
                        <TouchableOpacity
                          style={{
                            borderWidth: !heightInput ? 0 : 1,

                            padding: 10,
                            borderRadius: 10,
                            marginTop: 10,
                            width: 100,
                            backgroundColor: !heightInput ? "#bfbfbf" : "none",
                          }}
                          onPress={() => {
                            setHeightInput(!heightInput);
                            setAgeInput(true);
                            setWeightInput(true);
                            setActivityInput(true);
                          }}
                        >
                          {height ? (
                            <Text
                              style={{
                                fontFamily: "Reddit Sans",
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            >
                              {height}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: "Reddit Sans",
                                fontSize: 12,
                              }}
                            >
                              Select Height
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/* Activity Level */}
                  <View style={styles.fullWidthInput}>
                    <Text style={styles.label}>Activity Level</Text>
                    <View style={styles.pickerContainer}>
                      <TouchableOpacity
                        style={{
                          borderWidth: !activityInput ? 0 : 1,

                          padding: 10,
                          borderRadius: 10,
                          marginTop: 10,
                          backgroundColor: !activityInput ? "#bfbfbf" : "none",
                        }}
                        onPress={() => {
                          setActivityInput(!activityInput);
                          setAgeInput(true);
                          setWeightInput(true);
                          setHeightInput(true);
                        }}
                      >
                        {activityLevel ? (
                          <Text
                            style={{
                              fontFamily: "Reddit Sans",
                              fontSize: 13,
                              fontWeight: "bold",
                            }}
                          >
                            {activityLevel}
                          </Text>
                        ) : (
                          <Text
                            style={{ fontFamily: "Reddit Sans", fontSize: 13 }}
                          >
                            Select Activity Level
                          </Text>
                        )}
                      </TouchableOpacity>

                      {ageInput ? null : (
                        <View>
                          <Picker
                            selectedValue={age}
                            onValueChange={(value) => setAge(value)}
                            style={styles.picker}
                          >
                            <Picker.Item label="Select Age" value="" />
                            {ageList.map((age, index) => {
                              return (
                                <Picker.Item
                                  style={styles.pickerItem}
                                  key={index}
                                  label={age}
                                  value={age}
                                />
                              );
                            })}
                          </Picker>
                        </View>
                      )}
                      {weightInput ? null : (
                        <View>
                          <Picker
                            selectedValue={weight}
                            onValueChange={(value) => setWeight(value)}
                            style={styles.picker}
                          >
                            <Picker.Item label="Select Weight" value="" />
                            {weightList.map((weight, index) => {
                              return (
                                <Picker.Item
                                  style={styles.pickerItem}
                                  key={index}
                                  label={weight}
                                  value={weight}
                                />
                              );
                            })}
                          </Picker>
                        </View>
                      )}
                      {heightInput ? null : (
                        <View>
                          <Picker
                            selectedValue={height}
                            onValueChange={(value) => setHeight(value)}
                            style={styles.picker}
                          >
                            <Picker.Item label="Select Height" value="" />
                            {heightList.map((height, index) => {
                              return (
                                <Picker.Item
                                  style={styles.pickerItem}
                                  key={index}
                                  label={height}
                                  value={height}
                                />
                              );
                            })}
                          </Picker>
                        </View>
                      )}
                      {activityInput ? null : (
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
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 87,
                height: 87,
                borderRadius: 43.5,
                alignSelf: "center",
                marginTop: 20,
                backgroundColor: "#000",
              }}
            >
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="black"
                ></ActivityIndicator>
              ) : (
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 87,
                    height: 87,
                    borderRadius: 43.5,
                  }}
                  onPress={handleSubmit}
                >
                  <Text style={styles.arrow}>&rarr;</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pic: {
    width: 322.78,
    height: 128.43,
  },

  picContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontFamily: "Reddit Sans",
    fontWeight: "bold",
    fontSize: 20,
  },

  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingTop: 20,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrow: {
    fontSize: 30,
    color: "#fff",
  },

  picker: {
    marginTop: 10,
  },
});

export default BodyMeasure;
