import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import AppleHealthKit, { HealthValue } from "react-native-health";

const HealthKitExample = () => {
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    console.log(AppleHealthKit);
    console.log(typeof AppleHealthKit.initHealthKit);
    // Initialize HealthKit
    AppleHealthKit.initHealthKit(
      {
        permissions: {
          read: ["StepCount"],
          write: ["StepCount"],
        },
      },
      (error) => {
        if (error) {
          console.log("Error initializing HealthKit: ", error);
          return;
        }

        // Fetch step count data
        AppleHealthKit.getStepCount(
          { date: new Date().toISOString() },
          (err, results) => {
            if (err) {
              console.log("Error fetching step count: ", err);
              return;
            }
            setSteps(results.value);
          }
        );

        // Fetch heart rate data
        AppleHealthKit.getHeartRateSamples(
          {
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
          },
          (err, results) => {
            if (err) {
              console.log("Error fetching heart rate: ", err);
              return;
            }
            if (results.length > 0) {
              setHeartRate(results[0].value);
            }
          }
        );
      }
    );
  }, []);

  return (
    <SafeAreaView>
      <Text>Step Count: {steps}</Text>
    </SafeAreaView>
  );
};

export default HealthKitExample;
