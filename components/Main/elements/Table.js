import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Table = () => {
  const tableData = [
    {
      level: "Small Deficit",
      percentage: "5-10%",
      deficit: "100-300kcal/day",
      description:
        "Ideal for slow fat loss and muscle preservation. Minimal impact on energy levels and performance.",
    },
    {
      level: "Moderate Deficit",
      percentage: "10–20%",
      deficit: "300–500 kcal/day",
      description:
        "Most common for sustainable fat loss.\nAllows for steady fat loss while maintaining muscle and performance.",
    },
    {
      level: "Large Deficit",
      percentage: "20–30%",
      deficit: "500–800 kcal/day",
      description:
        "Leads to faster fat loss but risks muscle loss and fatigue. Suitable for short-term cuts or when highly active.",
    },
    {
      level: "Extreme Deficit",
      percentage: "30–50%",
      deficit: "800–1500+ kcal/day",
      description:
        "Used for aggressive fat loss. High risk of muscle loss, metabolic slowdown, and hormonal disruption.",
    },
    {
      level: "Crash Deficit",
      percentage: ">50%",
      deficit: "1500+ kcal/day",
      description:
        "Unsustainable and unhealthy. Leads to severe muscle loss, nutrient deficiencies, and fatigue.",
    },
  ];

  return (
    <View>
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.tableRow}>
          <Text
            style={[styles.tableCell, styles.headerCell, { color: "#fff" }]}
          >
            Deficit Level
          </Text>
          <Text
            style={[styles.tableCell, styles.headerCell, { color: "#fff" }]}
          >
            % of TDEE
          </Text>
          <Text
            style={[styles.tableCell, styles.headerCell, { color: "#fff" }]}
          >
            Caloric Deficit
          </Text>
          <Text
            style={[styles.tableCell, styles.headerCell, { color: "#fff" }]}
          >
            Description
          </Text>
        </View>

        {/* Rows */}
        {tableData.map((row, index) => (
          <View key={index} style={[styles.tableRow]}>
            <Text style={styles.tableCell}>{row.level}</Text>
            <Text style={styles.tableCell}>{row.percentage}</Text>
            <Text style={styles.tableCell}>{row.deficit}</Text>
            <Text style={[styles.tableCell, { textAlign: "left" }]}>
              {row.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,

    borderRadius: 5,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    width: 50,

    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#000",
  },
});

export default Table;
