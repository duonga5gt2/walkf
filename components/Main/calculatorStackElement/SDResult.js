import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { useStyles } from "../../../contexts/StyleContext";
import Table from "../elements/Table";
import { useMain } from "../../../contexts/MainContext";

export default function SDResult({ navigation, route }) {
  const {
    smallNavigation,
    largerNavigation,
    activityList,
    foodList,
    gender,
    weight,
    age,
    height,
  } = route.params;
  const { styles } = useStyles();
  const { setTabBarStatus } = useMain();

  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [caloriesIntake, setCaloriesIntake] = useState(0);
  const [bmr, setBmr] = useState(0);
  const [tef, setTef] = useState(0);

  const Bmr = (gender, weight, height, age) => {
    if (gender) {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    }

    return 10 * weight + 6.25 * height - 5 * age - 161;
  };

  useEffect(() => {
    let tef = 0;
    // Calculate total calories burned
    const totalCaloriesBurned = activityList.reduce(
      (total, activity) => total + activity.result,
      0
    );

    for (const i of foodList) {
      tef += i.protein;
    }

    // Calculate total calories intake
    const totalIntake = foodList.reduce((total, food) => total + food.size, 0);

    // Update state with the calculated totals
    setCaloriesBurned(totalCaloriesBurned);
    setCaloriesIntake(totalIntake);
    setBmr(Bmr(gender, weight, height, age));
    setTef(tef);
  }, [activityList, foodList]);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
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

        <View>
          <Text
            style={{
              fontFamily: "Reddit Sans",
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            Result
          </Text>
          <View style={{ borderWidth: 1, width: "90%" }}></View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 500 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 100,
                paddingTop: 20,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    fontFamily: "Reddit Sans",
                    paddingBottom: 25,
                  }}
                >
                  Calories burned =
                </Text>
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                    {(caloriesBurned + bmr + tef).toFixed(0)}kcal
                  </Text>
                </View>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    fontFamily: "Reddit Sans",
                    paddingBottom: 25,
                  }}
                >
                  Calories intake =
                </Text>
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                    {caloriesIntake.toFixed(0)}kcal
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                paddingTop: 50,
                paddingBottom: 20,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Reddit Sans",
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  Conclusion: {"\n"}
                  {caloriesBurned + bmr - caloriesIntake >= 0
                    ? (caloriesBurned + bmr - caloriesIntake).toFixed(0)
                    : (caloriesIntake - caloriesBurned - bmr).toFixed(0)}{" "}
                  calories{" "}
                  {caloriesBurned + bmr - caloriesIntake >= 0 ? (
                    <Text>deficit</Text>
                  ) : (
                    <Text>surplus</Text>
                  )}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  smallNavigation.navigate("Front");
                  setTabBarStatus(true);
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
                  Finish
                </Text>
              </TouchableOpacity>
            </View>
            {caloriesBurned + bmr - caloriesIntake >= 0 && <Table />}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
