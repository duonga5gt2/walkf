import React, { createContext, useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Svg, Defs, LinearGradient, Stop, Rect } from "react-native-svg";

// Create a context for styles
const StyleContext = createContext();

// Hook to use the StyleContext
export function useStyles() {
  return useContext(StyleContext);
}

// Provider Component to wrap the app
export function StyleProvider({ children }) {
  // Dynamic styles based on theme
  const styles = StyleSheet.create({
    picker: {
      marginTop: 10,
    },
    input: {
      borderBottomWidth: 1,
      padding: 5,
      marginBottom: 20,
    },
    viewAfterSafeArea: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    topLogo: {
      width: 171.47,
      height: 100,
    },

    topLogoNotHomePage: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    title: {
      fontFamily: "Reddit Sans",
      fontWeight: "bold",
      fontSize: 36,
    },

    boxContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
    },

    boxCalculator: {
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
    },

    boxTitle: {
      fontSize: 24,
      fontFamily: "Reddit Sans",
      fontWeight: "bold",
    },

    boxDes: {
      fontSize: 13,
      fontFamily: "Reddit Sans",
    },

    rectangle: {
      width: 120,
      height: 120,

      borderRadius: 10,
      display: "flex",

      alignItems: "center",

      gap: 29,
      padding: 5,

      //IOS Shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 6,

      // Android Shadow
      elevation: 8,
    },

    rectangleTextUpper: {
      fontWeight: "bold",
      fontSize: 13,
      fontFamily: "Reddit Sans",
    },

    scrollTrack: {
      height: 6, // Indicator track height
      backgroundColor: "#e0e0e0", // Light gray track color
      width: "100%",
      borderRadius: 5,
      marginTop: 20,
      padding: 1,
      justifyContent: "center",
    },
    scrollIndicator: {
      height: "70%",
      backgroundColor: "#000", // Indicator bar color (Blue)
      borderRadius: 10, // Rounded edges for smooth look
      marginLeft: 2,
      marginRight: 2,
    },
    contentContainer: {
      alignItems: "center",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: 300,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 10, // For Android shadow
    },
    modalText: {
      fontSize: 16,
      color: "#333",
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: "#E53935",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    closeButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  // Expose styles and a function to toggle the theme
  const value = {
    styles,
  };

  return (
    <StyleContext.Provider value={value}>{children}</StyleContext.Provider>
  );
}
