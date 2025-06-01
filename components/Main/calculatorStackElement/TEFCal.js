import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useMain } from "../../../contexts/MainContext";

export default function TEFCal({ navigation, largerNavigation }) {
  const [protein, setProtein] = useState("");
  const [carb, setCarb] = useState("");
  const [fat, setFat] = useState("");

  const [result, setResult] = useState(0);

  const [resVisibility, setResVisibility] = useState(false);

  const { setTabBarStatus } = useMain();

  const [tempData, holdTempData] = useState({});

  const calculate = () => {
    if (protein && carb && fat) {
      const p = parseInt(protein) || 0;
      const c = parseInt(carb) || 0;
      const f = parseInt(fat) || 0;
      if (p === 0 || c === 0 || f === 0) {
        Alert.alert("Unexpected Error Occured");
        return;
      }
      const tefProtein = p * 4 * 0.25;
      const tefCarb = c * 4 * 0.07;
      const tefFat = f * 9 * 0.02;

      const totalTEF = tefProtein + tefCarb + tefFat;
      setResult(totalTEF);
      holdTempData({ p, c, f });
      setResVisibility(true);
      setProtein("");
      setCarb("");
      setFat("");
    } else {
      Alert.alert("No input fields should be empty");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ padding: 24, height: "100%" }}>
        <View
          id="firstContainer"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            id="inputContainer"
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <View id="protein">
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontWeight: "bold",
                  fontSize: 13,
                }}
              >
                Protein (g)
              </Text>
              <TextInput
                placeholder="Protein"
                keyboardType="numeric"
                value={protein}
                onChangeText={(value) => {
                  if (/^\d{0,3}$/.test(value)) {
                    setProtein(value);
                  }
                }}
                maxLength={3}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 8,
                  width: 100,
                }}
              />
            </View>
            <View id="carb">
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontWeight: "bold",
                  fontSize: 13,
                }}
              >
                Carbohydrate (g)
              </Text>
              <TextInput
                placeholder="Carbs"
                keyboardType="numeric"
                value={carb}
                onChangeText={(value) => {
                  if (/^\d{0,3}$/.test(value)) {
                    setCarb(value);
                  }
                }}
                maxLength={3}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 8,
                  width: 100,
                }}
              />
            </View>
            <View id="fat">
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontWeight: "bold",
                  fontSize: 13,
                }}
              >
                Fat (g)
              </Text>
              <TextInput
                placeholder="Fat"
                keyboardType="numeric"
                value={fat}
                onChangeText={(value) => {
                  if (/^\d{0,3}$/.test(value)) {
                    setFat(value);
                  }
                }}
                maxLength={3}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 8,
                  width: 100,
                }}
              />
            </View>
          </View>

          <View id="right-text">
            <Text style={{ paddingBottom: 5, fontFamily: "Reddit Sans" }}>
              Check your {"\n"}macronutrient?
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                width: 110,
                padding: 5,
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.goBack();
                largerNavigation.navigate("Log Food");
                setTabBarStatus(true);
              }}
            >
              <Text
                style={{
                  color: "white",
                  alignSelf: "center",
                  fontFamily: "Reddit Sans",
                  fontWeight: "bold",
                }}
              >
                Click here
              </Text>
            </TouchableOpacity>
          </View>
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
              width: "100%",
              borderRadius: 10,
              height: 38,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              calculate();
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

        <View>
          {resVisibility && (
            <View
              style={{
                paddingTop: 20,
              }}
            >
              <Text style={{ fontFamily: "Reddit Sans", fontWeight: "bold" }}>
                Calories Burned Disgesting Macronutrients:
              </Text>
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontSize: 36,
                  fontWeight: "bold",
                }}
              >
                {result}kcal
              </Text>
              <Text style={{ paddingTop: 15, fontFamily: "Reddit Sans" }}>
                is burned to digest{" "}
                <Text style={{ fontSize: 20, color: "red" }}>
                  {tempData.p}g of protein, {tempData.c}g of carb, {tempData.f}g
                  of fat.{" "}
                </Text>
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
