import { useState } from "react";
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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export function WFSignUp({ navigation, route }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputs = () => {
    if (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      password.trim() &&
      passwordConfirm.trim()
    ) {
      setDisabled(false);
      return true;
    } else {
      setDisabled(true);
      return false;
    }
  };

  const handleInputChange = (setter) => (value) => {
    setter(value);
    validateInputs();
  };

  const finalCheck = () => {
    if (!validateInputs()) {
      setErrorMessage("Please fill in all the required fields.");
    } else {
      setErrorMessage("");
    }
  };

  const isOver18 = (dob) => {
    const today = new Date();

    // Calculate the cutoff date for 18 years ago
    const cutoffDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    // Check if the birthDate is on or before the cutoff date
    return dob <= cutoffDate;
  };

  // Usage

  const [date, setDate] = useState(new Date()); // Default to current date
  const [show, setShow] = useState(false); // Controls visibility of the picker
  const [isDateSelected, setIsDateSelected] = useState(false);

  const today = date;
  const maxAgeDate = new Date(
    today.getFullYear() - 120,
    today.getMonth(),
    today.getDate()
  );
  const onChange = (event, selectedDate) => {
    // Close the picker
    if (selectedDate) {
      setDate(selectedDate); // Update the selected date
      setIsDateSelected(true); // Mark date as selected
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          validateInputs();
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                  Sign Up
                </Text>
              </View>

              {errorMessage ? (
                <Text style={{ color: "red", marginBottom: 10 }}>
                  {errorMessage}
                </Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={handleInputChange(setFirstName)}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={handleInputChange(setLastName)}
              />

              {/* DOB Input Field */}

              <TouchableOpacity
                style={styles.input}
                onPress={() => setShow(!show)}
              >
                <Text>
                  {!isDateSelected ? (
                    <Text style={{ color: "#d3d3d3" }}>Date of Birth</Text> // Placeholder text before selection
                  ) : (
                    `${date.getDate().toString().padStart(2, "0")}/${(
                      date.getMonth() + 1
                    )
                      .toString()
                      .padStart(2, "0")}/${date.getFullYear()}`
                  )}
                </Text>
              </TouchableOpacity>

              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChange}
                  minimumDate={maxAgeDate}
                  maximumDate={new Date()} // Restrict future dates
                />
              )}

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={handleInputChange(setEmail)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={handleInputChange(setPassword)}
                secureTextEntry
              />

              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChangeText={handleInputChange(setPasswordConfirm)}
                secureTextEntry
              />
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 87,
                  height: 87,
                  borderRadius: 43.5,
                  alignSelf: "center",
                  marginTop: 20,
                  backgroundColor: isDisabled ? "#d3d3d3" : "#000",
                }}
              >
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
                  disabled={isDisabled}
                  onPress={() => {
                    if (
                      password.trim() === passwordConfirm.trim() &&
                      password.length >= 6 &&
                      isOver18(date)
                    ) {
                      finalCheck();
                      navigation.navigate("BodyMeasure", {
                        firstName,
                        lastName,
                        email,
                        password,
                        date,
                      }); // Add data
                    } else if (password.length < 6) {
                      setErrorMessage(
                        "Password must be at least 6 characters long"
                      );
                    } else if (password.trim() !== passwordConfirm.trim()) {
                      setErrorMessage(
                        "Please ensure both passwords are the same"
                      );
                    } else {
                      setErrorMessage("The user must be at least 18 years old");
                    }
                  }}
                >
                  <Text style={styles.arrow}>&rarr;</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  picContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pic: {
    width: 322.78,
    height: 128.43,
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  arrow: {
    fontSize: 30,
    color: "#fff",
  },
});
