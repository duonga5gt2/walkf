import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function BMRCal() {
  const [gender, setGender] = useState(true);
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [activityLevel, setActivityLevel] = useState("");

  const [ageInput, setAgeInput] = useState(false);
  const [weightInput, setWeightInput] = useState(false);
  const [heightInput, setHeightInput] = useState(false);
  const [activityInput, setActivityInput] = useState(false);

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

  const options = [
    {
      id: "1",
      label:
        "Sedentary - Spend most of the day sitting (e. g. bankteller, desk job)",
      value: "Sedentary",
    },
    {
      id: "2",
      label:
        "Lightly Active - Spend a good part of the day on your feet (e. g. teacher, salesperson)",
      value: "Lightly Active",
    },
    {
      id: "3",
      label:
        "Moderately Active - Spend a good part of the day doing some physical acitivty (e. g. food server, postal carrier)",
      value: "Moderately Active",
    },
    {
      id: "4",
      label:
        "Very Active - Spend most of the day doing heavy physical activity (e. g. bike messenger, carpenter)",
      value: "Very Active",
    },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [resVisibility, setResVisibility] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option.value);
    setActivityLevel(option.value);
  };

  const [bmrResult, setBmrResult] = useState(0);
  const [tdeeResult, setTdeeResult] = useState(0);
  const [tempData, holdTempData] = useState({});

  const Bmr = (gender, weight, height, age) => {
    if (gender) {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    }

    return 10 * weight + 6.25 * height - 5 * age - 161;
  };

  const Tdee = (gender, weight, height, age, activityLevel) => {
    const bmr = Bmr(gender, weight, height, age);
    if (activityLevel === "Sedentary") {
      return bmr * 1.2;
    } else if (activityLevel === "Lightly Active") {
      return bmr * 1.375;
    } else if (activityLevel === "Moderately Active") {
      return bmr * 1.55;
    } else if (activityLevel === "Very Active") {
      return bmr * 1.9;
    }
  };

  const isValidBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi >= 10 && bmi <= 60;
  };

  const calculate = () => {
    if (weight && age && height && activityLevel) {
      if (isValidBMI(weight, height)) {
        const bmr = Bmr(gender, weight, height, age);
        const tdee = Tdee(gender, weight, height, age, activityLevel);
        setBmrResult(bmr);
        setTdeeResult(tdee);
        holdTempData({ gender, weight, height, age, activityLevel });
        setResVisibility(true);
        setAgeInput(false);
        setHeightInput(false);
        setWeightInput(false);
        setActivityInput(false);
        setAge(0);
        setWeight(0);
        setHeight(0);
        setActivityInput("");
      } else {
        Alert.alert("Please enter realistic data");
      }
    } else {
      Alert.alert("Age, weight, height and activity level cannot be empty");
    }
  };
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
          justifyContent: "space-between",
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
              setWeightInput(false);
              setHeightInput(false);
              setActivityInput(false);
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
              setAgeInput(false);
              setHeightInput(false);
              setActivityInput(false);
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
              setWeightInput(false);
              setActivityInput(false);
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
        <Text
          style={{
            fontFamily: "Reddit Sans",
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          Activity Level
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: activityInput ? 0 : 1,

            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: activityInput ? "#bfbfbf" : "none",
          }}
          onPress={() => {
            setActivityInput(true);
            setAgeInput(false);
            setWeightInput(false);
            setHeightInput(false);
          }}
        >
          {activityLevel ? (
            <Text
              style={{
                fontFamily: "Reddit Sans",
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              {activityLevel}
            </Text>
          ) : (
            <Text style={{ fontFamily: "Reddit Sans", fontSize: 13 }}>
              Select Activity Level
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

      {!ageInput ? null : (
        <View>
          <Picker selectedValue={age} onValueChange={(value) => setAge(value)}>
            <Picker.Item label="Select Age" value="" />
            {ageList.map((age, index) => {
              return <Picker.Item key={index} label={age} value={age} />;
            })}
          </Picker>
        </View>
      )}

      {!weightInput ? null : (
        <View>
          <Picker
            selectedValue={weight}
            onValueChange={(value) => setWeight(value)}
          >
            <Picker.Item label="Select Weight" value="" />
            {weightList.map((weight, index) => {
              return <Picker.Item key={index} label={weight} value={weight} />;
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
              return <Picker.Item key={index} label={height} value={height} />;
            })}
          </Picker>
        </View>
      )}

      {!activityInput ? null : (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            paddingTop: 20,
          }}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                {
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  alignItems: "flex-start",
                },
                selectedOption === option.value && {
                  backgroundColor: "black", // Highlighted background color
                },
              ]}
              onPress={() => handleOptionClick(option)}
            >
              <View>
                <Text
                  style={[
                    { fontFamily: "Reddit Sans" },
                    selectedOption === option.value && {
                      color: "#fff",
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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

        <View>
          {resVisibility && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 30,
                paddingTop: 20,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Reddit Sans",
                    fontWeight: "bold",
                  }}
                >
                  Basal Metabolic Rate{"\n"}(BMR)
                </Text>
                <Text
                  style={{
                    fontFamily: "Reddit Sans",
                    fontSize: 36,
                    fontWeight: "bold",
                  }}
                >
                  {bmrResult.toFixed(0)}kcal
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Reddit Sans",
                    fontWeight: "bold",
                  }}
                >
                  Total Daily Energy Expenditure{"\n"}(TDEE)
                </Text>
                <Text
                  style={{
                    fontFamily: "Reddit Sans",
                    fontSize: 36,
                    fontWeight: "bold",
                  }}
                >
                  {tdeeResult.toFixed(0)}kcal
                </Text>
              </View>
            </View>
          )}

          {resVisibility && (
            <View style={{ paddingTop: 20 }}>
              <Text style={{ fontFamily: "REddit Sans" }}>
                for a{" "}
                {tempData.gender ? (
                  <Text style={{ fontSize: 20, color: "red" }}>male</Text>
                ) : (
                  <Text style={{ fontSize: 20, color: "red" }}>female</Text>
                )}{" "}
                body at the age of{" "}
                <Text style={{ fontSize: 20, color: "red" }}>
                  {tempData.age}
                </Text>{" "}
                with{" "}
                <Text style={{ fontSize: 20, color: "red" }}>
                  {tempData.weight}kg
                </Text>{" "}
                heavy,{" "}
                <Text style={{ fontSize: 20, color: "red" }}>
                  {tempData.height}cm
                </Text>{" "}
                tall, and{" "}
                <Text style={{ fontSize: 20, color: "red" }}>
                  {tempData.activityLevel}
                </Text>{" "}
                activity level
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
