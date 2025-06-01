import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useStyles } from "../../../contexts/StyleContext";
import { useMain } from "../../../contexts/MainContext";
import { storeData, getData } from "../../persistence/localStorage";
import { useAuth } from "../../../contexts/AuthContext";
export default function LogFoodFront({ navigation, route }) {
  const { styles } = useStyles();
  const { bmr, tdee, setTabBarStatus } = useMain();
  const { currentUser } = useAuth();
  const [intake, setIntake] = useState(0);

  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);

  const [tef, setTef] = useState(0);

  useEffect(() => {
    let breakfastIntake = 0;
    let lunchIntake = 0;
    let dinnerIntake = 0;
    let tef = 0;
    const tefProtein = (p) => {
      return p * 4 * 0.25;
    };

    for (const i of breakfast) {
      if (breakfast.length > 0) {
        breakfastIntake += i.size;
        tef += tefProtein(i.protein);
      }
    }

    for (const j of lunch) {
      if (lunch.length > 0) {
        lunchIntake += j.size;
        tef += tefProtein(j.protein);
      }
    }

    for (const k of dinner) {
      if (dinner.length > 0) {
        dinnerIntake += k.size;
        tef += tefProtein(k.protein);
      }
    }

    const result = breakfastIntake + lunchIntake + dinnerIntake;

    setIntake(result);
    setTef(tef);

    if (breakfast.length > 0) {
      storeData(`breakfast${currentUser.uid}`, breakfast, currentUser.uid);
    }
    if (lunch.length > 0) {
      storeData(`lunch${currentUser.uid}`, lunch, currentUser.uid);
    }
    if (dinner.length > 0) {
      storeData(`dinner${currentUser.uid}`, dinner, currentUser.uid);
    }
  }, [breakfast, lunch, dinner]);

  useEffect(() => {
    const loadMeals = async () => {
      const storedBreakfast = await getData(
        `breakfast${currentUser.uid}`,
        currentUser.uid
      );
      const storedLunch = await getData(
        `lunch${currentUser.uid}`,
        currentUser.uid
      );
      const storedDinner = await getData(
        `dinner${currentUser.uid}`,
        currentUser.uid
      );

      setBreakfast(storedBreakfast || []); // Default to empty array if no data
      setLunch(storedLunch || []);
      setDinner(storedDinner || []);
    };

    loadMeals();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={[styles.viewAfterSafeArea, { flex: 1 }]}>
        <View style={styles.topLogoNotHomePage}>
          <View></View>
          <Image
            style={styles.topLogo}
            source={require("../../../assets/1-removebg-preview.png")}
          />
          <View></View>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Log Food</Text>
          <View style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Text style={{ fontFamily: "Reddit Sans" }}>
              <Text style={{ fontWeight: "bold" }}>
                Today's energy expenditure:
              </Text>
            </Text>
            <Text style={{ fontSize: 32, fontFamily: "Reddit Sans" }}>
              <Text style={{ color: "red" }}>{(tdee + tef).toFixed(0)}</Text>
              kcal
            </Text>
          </View>
          <View>
            <Text style={{ fontFamily: "Reddit Sans" }}>
              <Text style={{ fontWeight: "bold" }}>
                Today's{" "}
                <Text style={{ color: "#3700FF" }}>calories intake</Text>:{"\n"}
              </Text>
              <Text style={{ fontSize: 32 }}>
                <Text style={{ color: "red" }}>{intake.toFixed(0)}</Text>kcal
              </Text>
            </Text>
          </View>

          <View style={{ paddingTop: 20 }}>
            {/* First Item */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 10,
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  lineHeight: 22,
                }}
              >
                •
              </Text>
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontSize: 15,
                  lineHeight: 22,
                  color: "#000",
                  flex: 1,
                }}
              >
                To lose weight, your{" "}
                <Text
                  style={{
                    color: "#3700FF",
                    fontWeight: "bold",
                  }}
                >
                  calories intake{" "}
                </Text>
                should be less than your{" "}
                <Text style={{ fontWeight: "bold" }}>
                  Today's energy expenditure
                </Text>
                .
              </Text>
            </View>

            {/* Second Item */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 10,
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  lineHeight: 22,
                }}
              >
                •
              </Text>
              <Text
                style={{
                  fontFamily: "Reddit Sans",
                  fontSize: 15,
                  lineHeight: 21,
                  color: "#000",
                }}
              >
                To gain weight, your{" "}
                <Text
                  style={{
                    color: "#3700FF",
                    fontWeight: "bold",
                  }}
                >
                  calories intake{" "}
                </Text>
                should be more than your{" "}
                <Text style={{ fontWeight: "bold" }}>
                  Today's energy expenditure
                </Text>
                .
              </Text>
            </View>
          </View>

          <View style={{ borderWidth: 0.5 }}></View>
          <ScrollView style={{ padding: 10, paddingTop: 20 }}>
            <View style={{ paddingBottom: 450 }}>
              <View style={{ paddingBottom: 10 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Reddit Sans",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Breakfast
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Second", {
                        meal: breakfast,
                        setMeal: setBreakfast,
                      });
                      setTabBarStatus(false);
                    }}
                    style={{
                      backgroundColor: "#d9d9d9",
                      borderRadius: 10,
                      width: 70,
                      alignItems: "center",
                      alignSelf: "center",
                      padding: 5,
                    }}
                  >
                    <Text style={{ fontSize: 11, fontFamily: "Reddit Sans" }}>
                      Add Food
                    </Text>
                  </TouchableOpacity>
                </View>
                {breakfast.length > 0 ? (
                  <View>
                    {breakfast.map((food, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            backgroundColor: "#d9d9d9",
                            padding: 8,
                            borderRadius: 10,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            // Shadow for Android
                            elevation: 5,
                            marginBottom: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Reddit Sans",
                              fontWeight: "bold",
                            }}
                          >
                            {food.title}
                          </Text>
                          <Text style={{ fontFamily: "Reddit Sans" }}>
                            Calories: {food.size.toFixed(2)}kcal, Protein:{" "}
                            {food.protein.toFixed(2)}g
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: "#d9d9d9",
                      alignItems: "center",
                      padding: 10,
                    }}
                  >
                    <Text style={{ fontFamily: "Reddit Sans" }}>
                      No food has been added yet
                    </Text>
                  </View>
                )}
              </View>

              <View style={{ paddingBottom: 10 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Reddit Sans",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Lunch
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Second", {
                        meal: lunch,
                        setMeal: setLunch,
                      });
                      setTabBarStatus(false);
                    }}
                    style={{
                      backgroundColor: "#d9d9d9",
                      borderRadius: 10,
                      width: 70,
                      alignItems: "center",
                      alignSelf: "center",
                      padding: 5,
                    }}
                  >
                    <Text style={{ fontSize: 11, fontFamily: "Reddit Sans" }}>
                      Add Food
                    </Text>
                  </TouchableOpacity>
                </View>
                {lunch.length > 0 ? (
                  <View>
                    {lunch.map((food, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            backgroundColor: "#d9d9d9",
                            padding: 8,
                            borderRadius: 10,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            // Shadow for Android
                            elevation: 5,
                            marginBottom: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Reddit Sans",
                              fontWeight: "bold",
                            }}
                          >
                            {food.title}
                          </Text>
                          <Text style={{ fontFamily: "Reddit Sans" }}>
                            Calories: {food.size.toFixed(2)}kcal, Protein:{" "}
                            {food.protein.toFixed(2)}g
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: "#d9d9d9",
                      alignItems: "center",
                      padding: 10,
                    }}
                  >
                    <Text style={{ fontFamily: "Reddit Sans" }}>
                      No food has been added yet
                    </Text>
                  </View>
                )}
              </View>

              <View style={{ paddingBottom: 10 }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Reddit Sans",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Dinner
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Second", {
                        meal: dinner,
                        setMeal: setDinner,
                      });
                      setTabBarStatus(false);
                    }}
                    style={{
                      backgroundColor: "#d9d9d9",
                      borderRadius: 10,
                      width: 70,
                      alignItems: "center",
                      alignSelf: "center",
                      padding: 5,
                    }}
                  >
                    <Text style={{ fontSize: 11, fontFamily: "Reddit Sans" }}>
                      Add Food
                    </Text>
                  </TouchableOpacity>
                </View>
                {dinner.length > 0 ? (
                  <View>
                    {dinner.map((food, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            backgroundColor: "#d9d9d9",
                            padding: 8,
                            borderRadius: 10,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            // Shadow for Android
                            elevation: 5,
                            marginBottom: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Reddit Sans",
                              fontWeight: "bold",
                            }}
                          >
                            {food.title}
                          </Text>
                          <Text style={{ fontFamily: "Reddit Sans" }}>
                            Calories: {food.size.toFixed(2)}kcal, Protein:{" "}
                            {food.protein.toFixed(2)}g
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: "#d9d9d9",
                      alignItems: "center",
                      padding: 10,
                    }}
                  >
                    <Text style={{ fontFamily: "Reddit Sans" }}>
                      No food has been added yet
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
