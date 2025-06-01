import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useStyles } from "../../../contexts/StyleContext";

export default function LBMCal() {
  const { styles } = useStyles();

  const [gender, setGender] = useState(true);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bodyfat, setBodyfat] = useState(0);

  const [weightInput, setWeightInput] = useState(false);
  const [heightInput, setHeightInput] = useState(false);
  const [bodyfatInput, setbodyfatInput] = useState(false);

  const [result, setResult] = useState(0);

  const [tempData, holdTempData] = useState({});

  const isValidBDFRange = (gender, bodyfat) => {
    if (gender) {
      if (bodyfat >= 3 && bodyfat <= 40) {
        return true;
      }
      Alert.alert("Please enter realistic body fat percentage");
      return false;
    } else {
      if (bodyfat >= 10 && bodyfat <= 50) {
        return true;
      }
      Alert.alert("Please enter realistic body fat percentage");
      return false;
    }
  };

  const isValidBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi >= 10 && bmi <= 60;
  };

  const leanBodyMass = (gender, weight, height, bodyfat) => {
    if (gender) {
      if (bodyfat) {
        return weight * (1 - bodyfat * 0.01);
      }
      return 0.47 * weight + 0.267 * height - 19.2;
    } else {
      if (bodyfat) {
        return weight * (1 - bodyfat * 0.01);
      }
      return 0.252 * weight + 0.473 * height - 48.3;
    }
  };

  const calculate = () => {
    if (weight && height) {
      if (isValidBMI(weight, height)) {
        const finalResult = leanBodyMass(gender, weight, height, bodyfat);
        setResult(finalResult);
        holdTempData({ gender, weight, height, bodyfat });
        setResVisibility(true);
      } else {
        Alert.alert("Please enter realistic data");
      }
    } else {
      Alert.alert("Weight and height cannot be empty");
    }
  };

  const [resVisibility, setResVisibility] = useState(false);

  const weightList = [];
  const heightList = [];
  const bodyfatList = [];

  for (let j = 10; j <= 500; j++) {
    weightList.push(`${j}`);
  }

  for (let k = 50; k <= 250; k++) {
    heightList.push(`${k}`);
  }

  for (let l = 3; l <= 50; l++) {
    bodyfatList.push(`${l}`);
  }

  return (
    <View>
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
          gap: 50,
        }}
      >
        <View>
          <Text style={{ fontFamily: "Reddit Sans", fontWeight: "bold" }}>
            Weight (kg)
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: weightInput ? 0 : 1,

              padding: 10,
              borderRadius: 10,
              marginTop: 10,
              width: 100,
              backgroundColor: weightInput ? "#bfbfbf" : "none",
            }}
            onPress={() => {
              setWeightInput(true);
              setHeightInput(false);
              setbodyfatInput(false);
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
        <View>
          <Text style={{ fontFamily: "Reddit Sans", fontWeight: "bold" }}>
            Height (cm)
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: heightInput ? 0 : 1,

              padding: 10,
              borderRadius: 10,
              marginTop: 10,
              width: 200,
              backgroundColor: heightInput ? "#bfbfbf" : "none",
            }}
            onPress={() => {
              setHeightInput(true);
              setWeightInput(false);
              setbodyfatInput(false);
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
        <Text style={{ fontFamily: "Reddit Sans", fontWeight: "bold" }}>
          Body Fat (%) <Text style={{ color: "#b3b3b3" }}>(optional)</Text>
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: bodyfatInput ? 0 : 1,

            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            width: 110,
            backgroundColor: bodyfatInput ? "#bfbfbf" : "none",
          }}
          onPress={() => {
            setHeightInput(false);
            setWeightInput(false);
            setbodyfatInput(true);
          }}
        >
          {bodyfat ? (
            <Text
              style={{
                fontFamily: "Reddit Sans",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              {bodyfat}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "Reddit Sans",
                fontSize: 12,
              }}
            >
              Select Body Fat
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingTop: 30,
          display: "flex",

          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            width: "30%",
            borderRadius: 10,
            height: 38,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            calculate();
            setHeightInput(false);
            setWeightInput(false);
            setbodyfatInput(false);
            setWeight(0);
            setHeight(0);
            setBodyfat(0);
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
            Calculate
          </Text>
        </TouchableOpacity>
      </View>

      {!weightInput ? null : (
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

      {!heightInput ? null : (
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

      {!bodyfatInput ? null : (
        <View>
          <Picker
            selectedValue={bodyfat}
            onValueChange={(value) => setBodyfat(value)}
            style={styles.picker}
          >
            <Picker.Item label="" value="" />
            {bodyfatList.map((bodyfat, index) => {
              return (
                <Picker.Item
                  style={styles.pickerItem}
                  key={index}
                  label={bodyfat}
                  value={bodyfat}
                />
              );
            })}
          </Picker>
        </View>
      )}

      <View style={{ paddingTop: 28 }}>
        <Text
          style={{
            fontFamily: "Reddit Sans",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Result:
        </Text>
      </View>

      {resVisibility ? (
        <View>
          <View style={{ paddingTop: 19 }}>
            <Text
              style={{
                fontFamily: "Reddit Sans",
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              Lean Body Mass (LBM) ={" "}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 36,
                fontFamily: "Reddit Sans",
                fontWeight: "bold",
              }}
            >
              {result.toFixed(2)}kg
            </Text>
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontFamily: "Reddit Sans" }}>
              for a{" "}
              {tempData.gender ? (
                <Text style={{ fontSize: 20, color: "red" }}>male</Text>
              ) : (
                <Text style={{ fontSize: 20, color: "red" }}>female</Text>
              )}{" "}
              body with{" "}
              <Text style={{ fontSize: 20, color: "red" }}>
                {tempData.weight}kg
              </Text>{" "}
              heavy,{" "}
              <Text style={{ fontSize: 20, color: "red" }}>
                {tempData?.height}cm
              </Text>{" "}
              tall{" "}
              {tempData.bodyfat !== 0 ? (
                <Text>
                  , and{" "}
                  <Text style={{ fontSize: 20, color: "red" }}>
                    {tempData.bodyfat}%
                  </Text>{" "}
                  body fat
                </Text>
              ) : null}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}
