import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";

export default function CaloriesBurnedCal() {
  const [weight, setWeight] = useState("");
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [met, setMET] = useState(0);

  const [activityInput, setActivityInput] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState(false);

  const [result, setResult] = useState(0);
  const [resVisibility, setResVisibility] = useState(false);

  const metData = require("../../../assets/MET.json");
  const titleList = [
    "bicycling",
    "conditioning exercise",
    "dancing",
    "fishing and hunting",
    "home activities",
    "home repair",
    "inactivity quiet/light",
    "lawn and garden",
    "miscellaneous",
    "music playing",
    "occupation",
    "running",
    "self care",
    "sexual activity",
    "sports",
    "transportation",
    "walking",
    "water activities",
    "winter activities",
    "religious activities",
    "volunteer activities",
  ];
  const activitiesArray = [];

  for (let i = 0; i < titleList.length; i++) {
    for (let entry of metData) {
      if (titleList[i] === entry["MAJOR HEADING"]) {
        activitiesArray.push({
          [titleList[i]]: {
            activity: entry["SPECIFIC ACTIVITIES"],
            mets: entry["METS"],
          },
        });
      }
    }
  }

  const [descriptionArray, setDescriptionArray] = useState([]);

  const loadDescriptionArray = (activity) => {
    const newDescriptionArray = []; // Temporary array to update state

    activitiesArray.forEach((object) => {
      const key = Object.keys(object)[0]; // Get the key (e.g., "bicycling")

      if (activity === key) {
        newDescriptionArray.push({ [object[key].activity]: object[key].mets });
      }
    });

    setDescriptionArray(newDescriptionArray); // Update state
  };

  const renderActivity = ({ item }) => {
    return (
      <View style={{ padding: 5 }}>
        <TouchableOpacity
          onPress={() => {
            setActivity(item.charAt(0).toUpperCase() + item.slice(1));
            setActivityInput(false);
            loadDescriptionArray(item);
            setDescription("");
          }}
          style={{ padding: 3, borderBottomWidth: 1 }}
        >
          <Text style={{ fontFamily: "Reddit Sans" }}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDescription = ({ item }) => {
    const descriptionKey = Object.keys(item)[0]; // Extract key from object

    return (
      <View style={{ padding: 5 }}>
        <TouchableOpacity
          onPress={() => {
            setDescription(
              descriptionKey.charAt(0).toUpperCase() + descriptionKey.slice(1)
            ); // Set the selected description
            setMET(item[descriptionKey]); // Store MET value
            setDescriptionInput(false); // Hide the list
          }}
          style={{ padding: 3, borderBottomWidth: 1 }}
        >
          <Text style={{ fontFamily: "Reddit Sans" }}>
            {descriptionKey.charAt(0).toUpperCase() + descriptionKey.slice(1)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const calculateCalories = (met, weight, time) => {
    return (met * weight * (time / 60)).toFixed(2);
  };

  const calculate = () => {
    if (weight && time && met) {
      const w = parseInt(weight) || 0;
      const t = parseInt(time) || 0;
      if (w !== 0 && t !== 0) {
        const result = calculateCalories(met, w, t);
        setResult(result);
        setResVisibility(true);
      } else {
        Alert.alert("Unexpected Error");
      }
    } else {
      Alert.alert("No fields should be empty!");
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setActivityInput(false);
        setDescriptionInput(false);
      }}
    >
      <View style={{ height: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontFamily: "Reddit Sans", fontWeight: "bold" }}>
              Weight (kg)
            </Text>
            <TextInput
              placeholder="Weight"
              keyboardType="numeric"
              value={weight}
              onChangeText={(value) => {
                if (/^\d{0,3}$/.test(value)) {
                  setWeight(value);
                }
              }}
              maxLength={3}
              style={{
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                marginTop: 8,
                width: 137,
              }}
            />
          </View>
          <View>
            <Text style={{ fontFamily: "Reddit Sans", fontWeight: "bold" }}>
              Time (Minute)
            </Text>
            <TextInput
              placeholder="Time"
              keyboardType="numeric"
              value={time}
              onChangeText={(value) => {
                if (/^\d{0,3}$/.test(value)) {
                  setTime(value);
                }
              }}
              maxLength={3}
              style={{
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                marginTop: 8,
                width: 137,
              }}
            />
          </View>
        </View>

        <View style={{ paddingTop: 20 }}>
          <Text style={{ fontFamily: "Reddit Sans", fontWeight: "bold" }}>
            Activity
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: activityInput ? 0 : 1,

              padding: 10,
              borderRadius: 10,
              marginTop: 10,
              width: "100%",
              backgroundColor: activityInput ? "#bfbfbf" : "none",
            }}
            onPress={() => {
              setActivityInput(true);
              setDescriptionInput(false);
            }}
          >
            {activity ? (
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {activity}
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontSize: 12,
                  color: "#bfbfbf",
                }}
              >
                Select Activity
              </Text>
            )}
          </TouchableOpacity>
          {activityInput ? (
            <View
              style={{
                position: "absolute",
                top: 90, // Adjust based on your layout
                left: 0,
                width: "100%",
                maxHeight: 150,
                backgroundColor: "white",
                borderRadius: 10,
                zIndex: 10, // Ensures it appears on top
                elevation: 5, // Shadow for Android
                shadowColor: "#000", // Shadow for iOS
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              }}
            >
              <FlatList
                data={titleList}
                renderItem={renderActivity}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}
        </View>

        <View style={{ paddingTop: 20 }}>
          <Text style={{ fontFamily: "Reddit Sans", fontWeight: "bold" }}>
            Description
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: descriptionInput ? 0 : 1,

              padding: 10,
              borderRadius: 10,
              marginTop: 10,
              width: "100%",
              backgroundColor: descriptionInput ? "#bfbfbf" : "none",
            }}
            onPress={() => {
              setActivityInput(false);
              setDescriptionInput(true);
            }}
          >
            {description ? (
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {description}
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontSize: 12,
                  color: "#bfbfbf",
                }}
              >
                Select description
              </Text>
            )}
          </TouchableOpacity>
          {descriptionInput && descriptionArray.length > 0 ? (
            <View
              style={{
                position: "absolute",
                top: 90, // Adjust based on your layout
                left: 0,
                width: "100%",
                maxHeight: 150,
                backgroundColor: "white",
                borderRadius: 10,
                zIndex: 10, // Ensures it appears on top
                elevation: 5, // Shadow for Android
                shadowColor: "#000", // Shadow for iOS
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              }}
            >
              <FlatList
                data={descriptionArray}
                renderItem={renderDescription}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}
        </View>

        <View style={{ paddingTop: 20 }}>
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

        {resVisibility && (
          <View>
            <View style={{ paddingTop: 19 }}>
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                Calories Burned:
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
                {result}kcal
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
