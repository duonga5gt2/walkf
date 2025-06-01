import React, { useEffect, useState } from "react";
import { Text, View, Alert, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendEmailVerification } from "firebase/auth";

function VerifyPage({ navigation }) {
  const { logout, currentUser, setIsEmailVerified } = useAuth(); // Access the current user and logout function

  

  // Send verification email automatically on component mount
  useEffect(() => {
    const sendVerificationEmail = async () => {
      try {
        if (currentUser && !currentUser.emailVerified) {
          // Send verification email
          await sendEmailVerification(currentUser);
          setEmailSent(true);
          
        }
      } catch (error) {
        
        Alert.alert("Error", `Failed to send verification email`);
      }
    };

    sendVerificationEmail();
  }, [currentUser]); // Run only when currentUser changes

  // Check email verification status and navigate automatically
 
  useEffect(() => {
    const checkVerificationStatus = async () => {
      if (currentUser) {
        await currentUser.reload(); // Reload user data from Firebase
        if (currentUser.emailVerified) {
          navigation.navigate("MainPage") // Navigate to MainPage
        }
      }
    };

    // Periodically check verification status
    const intervalId = setInterval(checkVerificationStatus, 3000); // Check every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [currentUser, navigation]);


  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{padding: 29}}>
            <View style={styles.picContainer}>
                <Image style={ styles.pic } source={require('../assets/1-removebg-preview.png')}/>
            </View>


            <TouchableOpacity style={{ padding: 10, width: 40}} onPress={() => logout()}>
                <Image source={require('../assets/Arrow 1.png')}/>
            </TouchableOpacity>

            <View style={{paddingTop: 47, paddingBottom: 20}}>
              <Text style={styles.text}>Verification</Text>
            </View>

            <View style={{paddingBottom: 20}}>
              <Text style={{fontFamily: "Reddit Sans", fontSize: 15}}>A link has been sent to your email. Click into the link to verify your email and start using our service</Text>
            </View>
        
            <Text style={{ color: "green", marginBottom: 20, fontSize: 20, fontFamily: 'Reddit Sans' }}>
            Your account has been created. 
            </Text>

        <Text style={{ fontSize: 15, marginTop: 20 }}>
            Once verified, you will be redirected to the main page.
        </Text>

        

        <View style={{paddingTop: 20}}>
            <ActivityIndicator size='large' color='black'></ActivityIndicator>
        </View>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
    picContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
    
      pic: {
       
        width: 322.78,
        height: 128.43,
        
      },
      text: {
        fontFamily: "Reddit Sans",
        fontSize: 36,
        fontWeight: 'bold'
      },
})
export default VerifyPage;
