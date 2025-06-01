import { useContext, useEffect, useState, createContext } from "react";
import { auth } from "../firebase";
import { getUser, updateUser } from "../components/persistence/persistence";
import { useAuth } from "./AuthContext";
import { StyleSheet } from "react-native";

const MainContext = createContext();

export function useMain() {
  return useContext(MainContext);
}

export function MainProvider({ children }) {
  const [userDetailsObj, setUserDetailsObj] = useState({});
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const fetchUserData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await getUser(currentUser.uid); // Fetch from Firestore
      setUserDetailsObj(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch Data When User Logs In
  useEffect(() => {
    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    console.log(userDetailsObj);
    console.log(userDetailsObj.progressLogs);
    console.log(userDetailsObj.age); // Log after state update
  }, [userDetailsObj]);

  useEffect(() => {
    function firestoreTimestampToDate(timestamp) {
      if (!timestamp || typeof timestamp.seconds !== "number") {
        throw new Error("Invalid Firestore timestamp.");
      }

      // Convert seconds to milliseconds and add nanoseconds converted to milliseconds
      const milliseconds =
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
      return new Date(milliseconds);
    }

    // Example Usage

    if (userDetailsObj.age) {
      const birthTimestamp = new Date(
        firestoreTimestampToDate(userDetailsObj.age)
      ); // Convert timestamp to Date
      const today = new Date();

      let age = today.getFullYear() - birthTimestamp.getFullYear();
      const monthDiff = today.getMonth() - birthTimestamp.getMonth();

      // Adjust age if birthday hasn't occurred yet this year
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthTimestamp.getDate())
      ) {
        age--;
      }

      setCalculatedAge(age);
    }
  }, [userDetailsObj]);

  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [calculatedAge, setCalculatedAge] = useState(0); // Store the calculated age

  useEffect(() => {
    setCurrentWeight(userDetailsObj.weight);
    setCurrentHeight(userDetailsObj.height);
  }, [userDetailsObj]);

  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);
  const [pace, setPace] = useState(0);

  const bmr = userDetailsObj.gender
    ? 10 * currentWeight + 6.25 * currentHeight - 5 * calculatedAge + 5
    : 10 * currentWeight + 6.25 * currentHeight - 5 * calculatedAge - 161;

  let tdee;

  if (userDetailsObj.activityLevel === "Sedentary") {
    tdee = bmr * 1.2;
  } else if (userDetailsObj.activityLevel === "Lightly Active") {
    tdee = bmr * 1.375;
  } else if (userDetailsObj.activityLevel === "Moderately Active") {
    tdee = bmr * 1.55;
  } else if (userDetailsObj.activityLevel === "Very Active") {
    tdee = bmr * 1.9;
  }

  const updateUserData = (fieldName, newValue) => {
    return updateUser(currentUser.uid, fieldName, newValue);
  };

  const [curCalScreen, setCurCalScreen] = useState("Main");

  const [tabBarStatus, setTabBarStatus] = useState(true);

  const value = {
    firstName: userDetailsObj?.firstName || "",
    lastName: userDetailsObj?.lastName || "",
    gender: userDetailsObj?.gender || "",

    height: userDetailsObj?.height || 0,
    weight: userDetailsObj?.weight || 0,
    activityLevel: userDetailsObj?.activityLevel || "",
    createdAt: userDetailsObj?.createdAt || "",
    progress: userDetailsObj?.progressLogs || [],
    age: userDetailsObj?.age || "",
    bmr,
    tdee,
    tabBarStatus,
    setTabBarStatus,
    curCalScreen,
    setCurCalScreen,
    loading,
    setLoading,
    calories,
    setCalories,
    distance,
    setDistance,
    pace,
    setPace,
    calculatedAge,
    setCalculatedAge,
    currentHeight,
    currentWeight,
    setCalculatedAge,
    setCurrentHeight,
    setCurrentWeight,
    updateUserData,
    getUser,
    fetchUserData,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}
