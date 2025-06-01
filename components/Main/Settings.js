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
  SafeAreaView,
} from "react-native";
import { useMain } from "../../contexts/MainContext";
import { useAuth } from "../../contexts/AuthContext";
import { useStyles } from "../../contexts/StyleContext";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";

export default function Settings({ navigation }) {
  const { currentHeight, currentWeight, firstName, lastName, setTabBarStatus } =
    useMain();

  const { logout, resetPassword, currentUser, changeEmail } = useAuth();
  const { styles } = useStyles();

  const [email, setEmail] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const showLogOut = () => {
    Alert.alert("Log Out", "Are you sure want to log out?", [
      { text: "Yes", onPress: () => logout() },
      { text: "No", style: "cancel" },
    ]);
  };

  const showChangeAlert = () => {
    Alert.alert(
      "Change Email",
      `By clicking Change, you are about to change your email address`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Change",
          onPress: () => {
            if (email) {
              sendEmailUpdateMail();
            } else {
              Alert.alert("Please enter new email address!");
            }
          },
        },
      ]
    );
  };

  const sendEmailUpdateMail = async () => {
    try {
      await changeEmail(email);
      Alert.alert("Your email has been changed!");
    } catch (error) {
      let errorMessage = "Something went wrong.";
      switch (error.code) {
        case "auth/requires-recent-login":
          errorMessage = "Please log in again before changing your email.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use.";
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert("Error", errorMessage);
      console.error(error);
    }
  };

  const showResetAlert = () => {
    Alert.alert(
      "Reset Password",
      `By clicking Send, a message will be sent to your ${currentUser.email} with the link to reset your password.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Send", onPress: () => sendResetPasswordMail() },
      ]
    );
  };

  const sendResetPasswordMail = async () => {
    try {
      await resetPassword(currentUser.email);
      Alert.alert("Email Sent");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          Alert.alert("No account found with this email.");
          break;
        case "auth/invalid-email":
          Alert.alert("Invalid email format.");
          break;
        default:
          Alert.alert("Unexpected Error: ", error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 24, flex: 1 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              setTabBarStatus(true);
            }}
          >
            <Image source={require("../../assets/Arrow 6.png")} />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "Reddit Sans",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Settings
          </Text>
        </View>

        <View
          style={{ padding: 10, paddingTop: 20, width: "100%", height: "100%" }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 10,
              padding: 10,
              width: "100%",
              backgroundColor: "#d3d3d3",
            }}
            onPress={showResetAlert}
          >
            <Text
              style={{
                fontFamily: "Reddit Sans",

                fontSize: 20,
                borderRadius: 10,
                alignSelf: "center",
              }}
            >
              Change Password
            </Text>
          </TouchableOpacity>

          <View style={{ marginTop: "100%" }}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                padding: 10,
                width: "100%",
                backgroundColor: "#d3d3d3",
                marginTop: 10,
              }}
              onPress={() => showLogOut()}
            >
              <Text
                style={{
                  fontFamily: "Reddit Sans",

                  fontSize: 20,
                  borderRadius: 10,
                  alignSelf: "center",
                  color: "red",
                }}
              >
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
                  Enter your new email
                </Text>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={{
                  backgroundColor: "#000",
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={showChangeAlert}
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
