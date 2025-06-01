import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { errorMessage } from "../errorMessage";
function ForgetPassword({ navigation }) {
  const { resetPassword } = useAuth();
  const [input, setInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await resetPassword(input);
      Alert.alert(
        "Password reset email sent. Please check your email to reset your password"
      );
      navigation.goBack()
    } catch (e) {
      const userFriendlyMessage =
        errorMessage[e.code] || "An unexpected error occurred.";
      Alert.alert(userFriendlyMessage); // Display the error to the user
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={[{backgroundColor: '#fff', flex: 1}]}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{ padding: 29 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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

        <View style={{ paddingTop: 47, paddingBottom: 20 }}>
          <Text style={styles.text}>Reset Password</Text>
        </View>

        <View>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={(input) => {
              setInput(input);
              if (input) {
                setIsDisabled(false);
              } else {
                setIsDisabled(true);
              }
            }}
            placeholder="Email"
          />
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
            backgroundColor: isDisabled ? "#d3d3d3" : "#000",
          }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="black"></ActivityIndicator>
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
              disabled={isDisabled}
              onPress={handleSubmit}
            >
              <Text style={styles.arrow}>&rarr;</Text>
            </TouchableOpacity>
          )}
        </View>
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

  text: {
    fontFamily: "Reddit Sans",
    fontSize: 36,
    fontWeight: "bold",
  },

  input: {
    borderBottomWidth: 1,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  arrow: {
    fontSize: 30,
    color: "#fff",
  },
});

export default ForgetPassword;
