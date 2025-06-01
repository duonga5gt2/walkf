import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from "react-native";

export function Welcome({ navigation, route }) {
  return (
    <SafeAreaView style={styles.fullScreen}>
      
      <View style={styles.headerContainer}>
        <Text style={styles.text}>Welcome to</Text>
        <Image source={require('../assets/1-removebg-preview.png')} style={styles.image}></Image>
        <Text style={styles.textRegular}>---- Simplify your fitness goal by just walking ----</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.logInButton]} onPress={() => {navigation.navigate("Login")}}>
          <Text style={[styles.textLogInSignUp, {color:'#fff'}]}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.signUpButton]} onPress={() => navigation.navigate("WFSignUp")}>
          <Text style={[styles.textLogInSignUp, {color:'#000'}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  fullScreen: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 279,
    backgroundColor: '#fff'
  },
  headerContainer: {
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    
  
  },
  text: {
    fontFamily: "Reddit Sans",
    fontSize: 36,
    fontWeight: "bold", // fontFamily is already applied globally
  },

  textRegular: {
    fontFamily: "Reddit Sans",
    fontSize: 13
  },

  textLogInSignUp : {
    fontFamily: "Reddit Sans",
    fontSize: 16
  },  

  image: {
    
    width: 388.75,
    height: 121.09
  },

  buttonGroup :{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4
  },


  logInButton : {
    backgroundColor: '#000',
    height: 43,
    width: 286,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  signUpButton : {
    height: 43,
    width: 286,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }


});
