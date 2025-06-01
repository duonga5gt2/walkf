import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useMain } from "../../../contexts/MainContext";
import { useStyles } from "../../../contexts/StyleContext";
import { Picker } from "@react-native-picker/picker";
function SDBMR({ navigation }) {
  const { setTabBarStatus } = useMain();
  const { styles } = useStyles();

  const [gender, setGender] = useState(true);
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);

  const [ageInput, setAgeInput] = useState(false);
  const [heightInput, setHeightInput] = useState(false);

  const ageList = [];
  const weightList = [];
  const heightList = [];

  for (let i = 18; i <= 120; i++) {
    ageList.push(`${i}`);
  }

  for (let j = 10; j <= 500; j++) {
    weightList.push(`${j}`);
  }

  for (let k = 50; k <= 250; k++) {
    heightList.push(`${k}`);
  }

  const calculate = () => {
    if (age && height) {
      navigation.navigate("Activity", {
        gender,
        age: parseInt(age),
        height: parseInt(height),
      });
    } else {
      Alert.alert("Age and height cannot be empty");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image
        style={styles.topLogo}
        source={require("../../../assets/1-removebg-preview.png")}
      />
      <View style={{ padding: 24 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 13,
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              setTabBarStatus(true);
            }}
          >
            <Image source={require("../../../assets/Arrow 1.png")} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Reddit Sans",
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            Calories Surplus/Deficit
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Reddit Sans",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Gender
          </Text>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setGender(true);
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                marginTop: 10,
                width: 150,
                borderRadius: 10,
                backgroundColor: gender ? "#bfbfbf" : "none",
              }}
            >
              <View
                style={{
                  width: 12, // Diameter of the circle
                  height: 12, // Diameter of the circle
                  borderRadius: 6, // Half of the width or height
                  borderWidth: 1,
                  backgroundColor: gender ? "black" : "white",
                }}
              ></View>
              <Text
                style={[
                  {
                    fontFamily: "Reddit Sans",
                    fontWeight: "bold",
                    fontSize: 15,
                    fontWeight: "regular",
                    marginLeft: 10,
                  },
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
                backgroundColor: !gender ? "#bfbfbf" : "none",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  width: 12, // Diameter of the circle
                  height: 12, // Diameter of the circle
                  borderRadius: 6, // Half of the width or height
                  borderWidth: 1,
                  backgroundColor: !gender ? "black" : "white",
                }}
              ></View>
              <Text
                style={[
                  {
                    fontFamily: "Reddit Sans",
                    fontWeight: "bold",
                    fontSize: 15,
                    fontWeight: "regular",
                    marginLeft: 10,
                  },
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            paddingTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 50,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Reddit Sans",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Age
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: ageInput ? 0 : 1,
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
                width: 80,
                backgroundColor: ageInput ? "#bfbfbf" : "none",
              }}
              onPress={() => {
                setAgeInput(true);

                setHeightInput(false);
              }}
            >
              {age ? (
                <Text
                  style={{
                    fontFamily: "Reddit Sans",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  {age}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "Reddit Sans",
                    fontSize: 12,
                  }}
                >
                  Select Age
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Reddit Sans",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Height (cm)
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: heightInput ? 0 : 1,

                padding: 10,
                borderRadius: 10,
                marginTop: 10,
                width: 100,
                backgroundColor: heightInput ? "#bfbfbf" : "none",
              }}
              onPress={() => {
                setHeightInput(true);
                setAgeInput(false);
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

        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity
            onPress={calculate}
            style={{
              backgroundColor: "black",
              width: "30%",
              borderRadius: 10,
              height: 38,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Reddit Sans",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Proceed
            </Text>
          </TouchableOpacity>
        </View>

        {!ageInput ? null : (
          <View>
            <Picker
              selectedValue={age}
              onValueChange={(value) => setAge(value)}
            >
              <Picker.Item label="Select Age" value="" />
              {ageList.map((age, index) => {
                return <Picker.Item key={index} label={age} value={age} />;
              })}
            </Picker>
          </View>
        )}

        {!heightInput ? null : (
          <View>
            <Picker
              selectedValue={height}
              onValueChange={(value) => setHeight(value)}
            >
              <Picker.Item label="Select Height" value="" />
              {heightList.map((height, index) => {
                return (
                  <Picker.Item key={index} label={height} value={height} />
                );
              })}
            </Picker>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default SDBMR;
