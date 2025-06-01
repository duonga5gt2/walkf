import { useState } from "react";
import { View, Text, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";

import { useAuth } from "../contexts/AuthContext";
export function LogIn({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmpty, setEmpty] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const handleSubmit = async() => {
    if (!email || !password) {
      setEmpty(!isEmpty)
    }
    else {
      
      try {
        setEmpty(true)
        setError('');
        setLoading(true)
        const userCredential = await login(email, password);
        console.log("Login successfully");
        
        
      }
      catch (e) {
        setError('Incorrect email or password')
        console.log(e)
      }
      finally {
        setLoading(false)
      }
    }
  }
  return (
    <SafeAreaView style={[{backgroundColor: '#fff', flex: 1}]}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={{padding: 29}}>

          <View style={styles.picContainer}>
            <Image style={ styles.pic } source={require('../assets/1-removebg-preview.png')}/>
          </View>

          <TouchableOpacity style={{ padding: 10, width: 40}} onPress={() => navigation.goBack()}>
            <Image source={require('../assets/Arrow 1.png')}/>
          </TouchableOpacity>

          <View style={{paddingTop: 47, paddingBottom: 20}}>
            <Text style={styles.text}>Log In</Text>
          </View>

          <View>
            {
              isEmpty ?  null : <Text
              style={
                {
                  color: 'red',
                  paddingBottom: 10
                }
              }>Email or password cannot be empty</Text> 
            }
            {
              (error ? <Text style={{color: 'red'}}>{error}</Text> : null)
            }
            
          </View>

          <View>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              secureTextEntry
            />
          </View>
          {
            loading 
            ? 
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="blue" />
            </View>
            :
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={[{color: '#fff'}, styles.textButton]}>Submit</Text>
              </TouchableOpacity>
            </View>
          }
          

          <View style={{marginTop: 20}} >
            <Text style={{textDecorationLine: 'underline', color: '#000', fontFamily: 'Reddit Sans'}} onPress={() => navigation.navigate("ForgetPassword")}>Forgot password</Text>
          </View>

          <View style={{marginTop: 200}}>
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontFamily: "Reddit Sans", fontSize: 14, fontWeight: 'bold'}}>
                Need an account? 
              </Text>
            </View>
            <TouchableOpacity style={styles.googleButton} onPress={()=> {
              navigation.goBack();
              navigation.navigate('WFSignUp')}}>
              <Text style={[{color: '#2116f5', fontWeight: 'bold'}, styles.textButton]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  text: {
    fontFamily: "Reddit Sans",
    fontSize: 36,
    fontWeight: 'bold'
  },

  textButton: {
    fontFamily: "Reddit Sans",
    fontSize: 16,
    
  },

  picContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  pic: {
   
    width: 322.78,
    height: 128.43,
    
  },

  input: {
    borderBottomWidth: 1,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
    
  },

  submitButton : {
    backgroundColor: 'black',
    height: 40,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  googleButton: {
    height: 40,
    
    
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    
  }
})
