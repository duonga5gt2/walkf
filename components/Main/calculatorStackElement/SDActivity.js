import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { useMain } from "../../../contexts/MainContext";
import { useStyles } from "../../../contexts/StyleContext";
import { useState } from "react";

export default function SDActivity({ navigation, route }) {
  const { setTabBarStatus } = useMain();
  const { styles } = useStyles();
  const { gender, age, height } = route.params;

  const [weight, setWeight] = useState("");
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState(
    "--Please Enter Your Activity First--"
  );
  const [met, setMET] = useState(0);

  const [activityInput, setActivityInput] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState(false);

  const [activityList, setActivityList] = useState([]);

  const metData = require("../../../assets/MET.json");
  const titleList = [
    "bicycling",
    "conditioning exercise",
    "dancing",
    "fishing and hunting",
    "home activities",
    "home repair",

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
    return met * weight * (time / 60);
  };

  const calculate = () => {
    if (
      weight &&
      time &&
      met &&
      activity &&
      description !== "--Please Enter Your Activity First--" &&
      description
    ) {
      const w = parseInt(weight) || 0;
      const t = parseInt(time) || 0;
      if (w !== 0 && t !== 0) {
        const result = calculateCalories(met, w, t);
        const newResult = {
          activity,
          result,
          weight: w,
          time: t,
        };
        setActivityList((current) => {
          return [...current, newResult];
        });
        setActivity("");
        setDescription("--Please Enter Your Activity First--");
      } else {
        Alert.alert("Unexpected Error");
      }
    } else {
      Alert.alert("No fields should be empty!");
    }
  };

  const removeItem = (itemIndexToRemove) => {
    setActivityList((prevItems) =>
      prevItems.filter((_, index) => index !== itemIndexToRemove)
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setActivityInput(false);
        setDescriptionInput(false);
      }}
    >
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

          <View style={{ paddingBottom: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Reddit Sans",
                fontWeight: "bold",
              }}
            >
              Logging in today's activities
            </Text>
          </View>

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
              onPress={() => {
                calculate();
              }}
              style={{
                borderRadius: 10,
                backgroundColor: "#bfbfbf",
                width: 50,
                height: 50,
                padding: 5,
                borderRadius: 25,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "#1E90FF",
                alignSelf: "center",
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 30, alignSelf: "center", color: "#fff" }}
                >
                  +
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: 190, // Set fixed height or remove maxHeight
              borderRadius: 10,
              backgroundColor: "#bfbfbf",
              marginTop: 10,
            }}
          >
            {activityList.length > 0 ? (
              <ScrollView
                showsVerticalScrollIndicator
                style={{ padding: 5 }}
                contentContainerStyle={{
                  paddingBottom: 20,
                }}
              >
                {activityList.map((item, index) => (
                  <TouchableWithoutFeedback key={index}>
                    <View
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 5,
                        backgroundColor: "white",
                        borderRadius: 10,
                      }}
                    >
                      <View>
                        <Text style={{ fontWeight: "bold" }}>
                          {item.activity}
                        </Text>
                        <Text>
                          {item.result.toFixed(2)}kcal, {item.time}min,{" "}
                          {item.weight}kg{" "}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => removeItem(index)}>
                        <Text style={{ fontSize: 50 }}>-</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </ScrollView>
            ) : (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>No activities logged yet.</Text>
              </View>
            )}
          </View>

          <View style={{ paddingTop: 20 }}>
            <TouchableOpacity
              onPress={() => {
                if (activityList.length > 0) {
                  navigation.navigate("Food", {
                    activityList: activityList,
                    gender,
                    age,
                    height,
                    weight: parseInt(weight),
                  });
                } else {
                  Alert.alert("You have not logged your activity");
                }
              }}
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
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
