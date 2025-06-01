// import { View, Text, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";

// export function SignUp({navigation, route}) {
//     return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#fffh'}}>
//         <View style={{padding: 30}}>
//             <View style={styles.picContainer}>
//                 <Image style={ styles.pic } source={require('../assets/1-removebg-preview.png')}/>
//             </View>

//             <TouchableOpacity style={{ padding: 10, width: 40}} onPress={() => navigation.goBack()}>
//                 <Image source={require('../assets/Arrow 1.png')}/>
//             </TouchableOpacity>

//             <View style={{paddingBottom: 144}}>
//                 <Text style={{fontFamily: 'Reddit Sans', fontWeight: 'bold', fontSize: 36}}>Sign Up</Text>
//             </View>

//             <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
//                 <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate("WFSignUp")}>
//                     <Image source={require('../assets/2-removebg-preview 1.png')}></Image>
//                     <Text style={[{color: '#fff'}, styles.textButton]}>Sign up with WalkFitness</Text>
//                     <View></View>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.googleButton}>
//                     <Image source={require('../assets/LOGO (3).png')}></Image>
//                     <Text style={[{color: '#000'}, styles.textButton]}>Sign up with Google</Text>
//                     <View></View>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     </SafeAreaView>
//     )
// }


// const styles = StyleSheet.create({
//     picContainer: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },

//     pic: { 
//         width: 322.78,
//         height: 128.43,
//     },

//     googleButton: {
//         height: 40,
//         borderWidth: 1,
//         borderRadius: 12,
//         borderColor: '#dadce0',
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
    
//       },
    
//       textButton: {
//         fontFamily: "Reddit Sans",
//         fontSize: 16,
        
//       },

//     signUpButton: {
//         backgroundColor: 'black',
//         height: 40,
//         borderRadius: 12,
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 30
//     }
// })