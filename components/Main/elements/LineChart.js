import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const LineChartComponent = ({ progress }) => {
  const today = new Date();

  const dateAndMonth = `${today.getDate()}/${today.getMonth() + 1}`;
  const weightData = progress;

  const [noOfSections, setSections] = useState(4);

  // Calculate min and max values dynamically
  const maxValue = Math.max(...weightData.map((d) => d.value));
  const minValue = Math.min(...weightData.map((d) => d.value));

  // --- ACTUAL FIX ---
  const yAxisOffset = minValue - 2; // Start Y-axis below the lowest point
  const yAxisMax = maxValue + 2; // Add padding above the highest point
  // Number of horizontal sections

  useEffect(() => {}, []);

  useEffect(() => {
    const maxDiff = maxValue - minValue;
    if (maxDiff > 5) {
      setSections(7);
    } else if (maxDiff > 3.5) {
      setSections(6);
    } else {
      setSections(4);
    }
  }, [maxValue, minValue]);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3f41ab",
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
      }}
    >
      <Text style={{ color: "#fff", marginBottom: 10 }}>
        Weight Progress (kg)
      </Text>

      <LineChart
        data={weightData}
        height={250}
        width={300}
        spacing={50}
        initialSpacing={30}
        color="#fff"
        thickness={3}
        hideRules={false}
        rulesThickness={1}
        rulesColor="rgba(255, 255, 255, 0.5)" // Lighter gridlines
        yAxisTextStyle={{
          color: "white",
          fontSize: 12,
        }}
        xAxisLabelTextStyle={{
          color: "white",
        }}
        yAxisLabelWidth={40}
        xAxisLabelTexts={weightData.map((item) => item.label)}
        noOfSections={noOfSections}
        yAxisOffset={yAxisOffset}
        yAxisExtraHeight={0} // Set to 0, it's not needed
        yAxisMaxValue={yAxisMax} // Force max Y-axis
        showDataPoints
        dataPointsColor="#fff"
        dataPointsRadius={3} // Larger data points for better visibility
        xAxisColor="#ff6347"
        yAxisThickness={0}
        xAxisThickness={1}
        yAxisColor="#ff6347"
        isBezier={false}
        stepValue={1}
      />
    </View>
  );
};

export default LineChartComponent;
