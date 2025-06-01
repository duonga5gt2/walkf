import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMain } from "../../../contexts/MainContext";
import { useStyles } from "../../../contexts/StyleContext";
import { useState } from "react";
import LBMCal from "./LBMCal";
import BMRCal from "./BMRCal";
import TEFCal from "./TEFCal";
import CaloriesBurnedCal from "./CaloriesBurnedCal";
export default function CalculatorSecond({ navigation, route }) {
  const { setTabBarStatus, curCalScreen, setCurCalScreen } = useMain();
  const { styles } = useStyles();
  const { name, largerNavigation } = route.params;

  const handleGoBack = () => {
    if (curCalScreen === "Instruction") {
      navigation.goBack();
    } else {
      setCurCalScreen("Instruction");
      setTabBarStatus(true);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={[styles.viewAfterSafeArea]}>
        <Image
          source={require("../../../assets/1-removebg-preview.png")}
          style={{ width: 126.59, height: 63.71 }}
        />
        <View
          style={{
            paddingTop: 23,
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleGoBack}>
            <Image source={require("../../../assets/FixArrow6.png")} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Reddit Sans",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
        </View>

        {name === "Lean Body Mass" && <LBM name={name} />}
        {name === "BMR & TDEE" && <BMR name={name} />}
        {name === "Activity Calorie" && <CaloriesBurned name={name} />}
        {name === "Thermal Effect of Food" && (
          <TEF
            name={name}
            navigation={navigation}
            largerNavigation={largerNavigation}
          />
        )}
        {name === "Calories Surplus/Deficit" && (
          <CaloSD
            name={name}
            navigation={navigation}
            largerNavigation={largerNavigation}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function LBM({ name }) {
  const { curCalScreen, setCurCalScreen, setTabBarStatus } = useMain();

  return (
    <View style={{ padding: 24 }}>
      {curCalScreen === "Instruction" ? (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            paddingBottom: 30, // Ensures extra space for the button
          }}
        >
          <Text
            style={{ fontSize: 15, fontFamily: "Reddit Sans", lineHeight: 30 }}
          >
            The <Text style={{ fontWeight: "bold" }}>Lean Body Mass (LBM)</Text>{" "}
            Calculator is a tool designed to estimate the amount of fat-free
            mass in your body, including muscles, bones, organs, and water. LBM
            is a key indicator of overall fitness, as it represents all the
            tissues in your body except fat. This calculator helps you track
            changes in muscle mass during fitness programs, weight loss, or
            bulking phases.
          </Text>

          <Text
            style={{
              fontSize: 15,
              fontFamily: "Reddit Sans",
              marginTop: 12,
              lineHeight: 30,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Disclaimer: </Text>The method
            we use is generally accurate for individuals with average body
            composition. However, it may not reflect the true lean body mass of
            athletes, bodybuilders, or those with a typical muscle mass or body
            fat distribution. For more accurate results, consider body
            composition scans (such as DEXA) or consult with a healthcare
            professional.
          </Text>
          <View
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCurCalScreen("");
                setTabBarStatus(false);
              }}
              style={{
                backgroundColor: "#000",
                padding: 8,
                borderRadius: 10,
                width: 128,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "Reddit Sans",
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
              >
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View>
          <LBMCal />
        </View>
      )}
    </View>
  );
}

function BMR({ name }) {
  const { curCalScreen, setCurCalScreen, setTabBarStatus } = useMain();
  return (
    <View style={{ padding: 24 }}>
      {curCalScreen === "Instruction" ? (
        <View>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Reddit Sans",
              lineHeight: 30,
            }}
          >
            The{" "}
            <Text style={{ fontWeight: "bold" }}>
              BMR (Basal Metabolic Rate)
            </Text>{" "}
            and
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              TDEE (Total Daily Energy Expenditure)
            </Text>{" "}
            Calculator is a powerful tool to estimate the number of calories
            your body requires for basic functions (BMR) and to maintain your
            current weight considering your activity levels (TDEE). Whether
            you're planning to lose fat, build muscle, or maintain your weight,
            this calculator provides essential data to guide your nutritional
            and fitness decisions.
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Reddit Sans",
              lineHeight: 30,
              paddingTop: 20,
            }}
          >
            Understanding your <Text style={{ fontWeight: "bold" }}>BMR</Text>{" "}
            and <Text style={{ fontWeight: "bold" }}>TDEE</Text> helps you make
            informed dietary and fitness choices. Whether your goal is{" "}
            <Text style={{ fontWeight: "bold" }}>
              fat loss, muscle gain, or weight maintenance
            </Text>
            , this calculator provides the foundation for achieving and
            sustaining optimal health and performance.
          </Text>
          <View
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCurCalScreen("");
                setTabBarStatus(false);
              }}
              style={{
                backgroundColor: "#000",
                padding: 8,
                borderRadius: 10,
                width: 128,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "Reddit Sans",
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
              >
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <BMRCal />
        </View>
      )}
    </View>
  );
}

function CaloriesBurned({ name }) {
  const { curCalScreen, setCurCalScreen, setTabBarStatus } = useMain();
  return (
    <View style={{ padding: 24 }}>
      {curCalScreen === "Instruction" ? (
        <View>
          <Text
            style={{ fontSize: 15, lineHeight: 20, fontFamily: "Reddit Sans" }}
          >
            The{" "}
            <Text style={{ fontWeight: "bold" }}>
              Calories Burned During Activities Calculator
            </Text>{" "}
            estimates the number of calories you burn while performing various
            activities based on the{" "}
            <Text style={{ fontWeight: "bold" }}>
              MET (Metabolic Equivalent of Task)
            </Text>{" "}
            values. This tool allows you to input your weight, activity type,
            and duration to calculate the energy expended during exercise or
            daily tasks. It’s ideal for{" "}
            <Text style={{ fontWeight: "bold" }}>
              tracking calorie burn and tailoring your fitness or weight loss
              goals.
            </Text>
          </Text>

          <Text
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              fontSize: 15,
              lineHeight: 20,
              fontFamily: "Reddit Sans",
            }}
          >
            Understanding the calories burned during activities calculator
            allows you to:
          </Text>

          <Text>
            {[
              "Plan effective workouts\n",
              "Adjust your calorie intake to meet weight loss or gain goals\n",
              "Monitor energy expenditure in everyday tasks\n",
            ].map((item, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    lineHeight: 20,
                    fontFamily: "Reddit Sans",
                    fontWeight: "bold",
                  }}
                >
                  - {item}
                </Text>
              );
            })}
          </Text>

          <Text
            style={{ fontFamily: "Reddit Sans", fontSize: 15, lineHeight: 20 }}
          >
            Whether you’re trying to lose weight, improve fitness, or maintain
            energy balance, this calculator helps you make informed decisions
            about your activity levels and nutrition.
          </Text>

          <View
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCurCalScreen("");
                setTabBarStatus(false);
              }}
              style={{
                backgroundColor: "#000",
                padding: 8,
                borderRadius: 10,
                width: 128,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "Reddit Sans",
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
              >
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <CaloriesBurnedCal />
        </View>
      )}
    </View>
  );
}

function TEF({ name, navigation, largerNavigation }) {
  const { curCalScreen, setCurCalScreen, setTabBarStatus } = useMain();
  return (
    <View
      style={{
        padding: curCalScreen === "Instruction" ? 24 : 10,
      }}
    >
      {curCalScreen === "Instruction" ? (
        <View>
          <Text
            style={{ fontSize: 17, fontFamily: "Reddit Sans", lineHeight: 20 }}
          >
            The{" "}
            <Text style={{ fontWeight: "bold" }}>
              Thermic Effect of Food (TEF) Calculator
            </Text>{" "}
            estimates the number of{" "}
            <Text style={{ fontWeight: "bold" }}>
              calories burned during digestion, absorption, and processing of
              the nutrients
            </Text>{" "}
            in your meals. By considering the macronutrient composition of your
            food (protein, carbs, and fats), this tool provides insights into{" "}
            <Text style={{ fontWeight: "bold" }}>
              how your body expends energy from eating
            </Text>
            , helping you better understand your metabolism and optimize your
            diet.
          </Text>

          <Text
            style={{
              paddingTop: 20,
              fontSize: 17,
              fontFamily: "Reddit Sans",
              lineHeight: 20,
            }}
          >
            The TEF Calculator helps you optimize your diet by showing how
            different macronutrient distributions impact calorie burn. A
            high-protein meal, for instance, burns more calories during
            digestion than one high in fats or carbs, making it{" "}
            <Text style={{ fontWeight: "bold" }}>
              a valuable tool for weight management and muscle-building goals.
            </Text>
          </Text>

          <View
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCurCalScreen("");
                setTabBarStatus(false);
              }}
              style={{
                backgroundColor: "#000",
                padding: 8,
                borderRadius: 10,
                width: 128,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "Reddit Sans",
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
              >
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TEFCal navigation={navigation} largerNavigation={largerNavigation} />
      )}
    </View>
  );
}

function CaloSD({ name, navigation, largerNavigation }) {
  const { curCalScreen, setCurCalScreen, setTabBarStatus } = useMain();

  return (
    <SafeAreaView style={{ padding: 24 }}>
      <Text style={{ fontFamily: "Reddit Sans", fontSize: 20, lineHeight: 30 }}>
        In order to calculate accurately,{" "}
        <Text style={{ fontWeight: "bold" }}>
          calories burned during activities
        </Text>{" "}
        and <Text style={{ fontWeight: "bold" }}>food consumed</Text> are
        required.
      </Text>

      <Text
        style={{
          paddingTop: 20,
          fontFamily: "Reddit Sans",
          fontSize: 20,
          lineHeight: 30,
        }}
      >
        The following steps will guide you through and help you acknowledge
        whether you are in a{" "}
        <Text style={{ fontWeight: "bold" }}>caloric surplus</Text> or{" "}
        <Text style={{ fontWeight: "bold" }}>deficit.</Text>
      </Text>

      <View
        style={{
          marginTop: 30,
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCurCalScreen("");
            setTabBarStatus(false);
            navigation.navigate("SDStack", {
              largerNavigation: largerNavigation,
            });
          }}
          style={{
            backgroundColor: "#000",
            padding: 8,
            borderRadius: 10,
            width: 128,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontFamily: "Reddit Sans",
              alignSelf: "center",
              fontWeight: "bold",
            }}
          >
            Proceed
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
