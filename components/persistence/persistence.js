import { db } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export const addUser = async (
  uid,
  firstName,
  lastName,
  age,
  gender,
  height,
  weight,
  activityLevel
) => {
  const getFormattedDate = () => {
    const today = new Date();
    return `${today.getDate()}/${today.getMonth() + 1}`;
  };

  const data = {
    uid: uid,
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: gender,
    height: height,
    weight: weight,
    activityLevel: activityLevel,
    createdAt: Timestamp.now(),
  };

  try {
    // Step 1: Add user to 'userDetails'
    const docRef = await addDoc(collection(db, "userDetails"), data);
    console.log("User created with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding user:", e);
    console.log(e);
  }
};

// Helper function to format date as 'dd/mm'

export const getUser = async (uid) => {
  try {
    // Query to fetch user by UID
    const q = query(collection(db, "userDetails"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No user found with UID:", uid);
      return null;
    }

    // Get the first matching document
    const userDoc = querySnapshot.docs[0];
    const userData = { id: userDoc.id, ...userDoc.data() };

    // Return user data combined with progress logs
    return userData;
  } catch (e) {
    console.error("Error fetching filtered data:", e.message);
    console.log(e);
    throw e;
  }
};

export const updateUser = async (uid, fieldName, newValue) => {
  try {
    const q = query(collection(db, "userDetails"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No user found with UID:", uid);
      return null;
    }

    const userDoc = querySnapshot.docs[0];

    await updateDoc(userDoc.ref, {
      [fieldName]: newValue,
    });

    console.log(`Field "${fieldName}" updated successfully!`);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfile = async (uid, updates) => {
  try {
    const q = query(collection(db, "userDetails"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No user found with UID:", uid);
      return null;
    }

    // Get the first matching document
    const userDoc = querySnapshot.docs[0];

    await updateDoc(userDoc.ref, updates);
    console.log("User data successfully updated:", updates);
  } catch {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const deleteUserFoodHistoryItem = async (
  uid,
  mealType,
  timeToDelete
) => {
  try {
    const userSnap = await getDocs(
      query(collection(db, "userDetails"), where("uid", "==", uid))
    );
    if (userSnap.empty) throw new Error("User not found");

    const userDoc = userSnap.docs[0];
    const userId = userDoc.id;

    const foodDocRef = doc(
      db,
      "userDetails",
      userId,
      "foodHistory",
      "foodHistorry"
    );
    const foodDocSnap = await getDoc(foodDocRef);

    if (!foodDocSnap.exists())
      throw new Error("foodHistorry document not found");

    const data = foodDocSnap.data();
    const currentMealArray = data?.todayMeal?.[mealType] || [];

    const updatedMealArray = currentMealArray.filter(
      (item) => item.time !== timeToDelete
    );

    await updateDoc(foodDocRef, {
      [`todayMeal.${mealType}`]: updatedMealArray,
    });

    console.log(`Deleted food log from ${mealType} with time: ${timeToDelete}`);
  } catch (error) {
    console.error("Error deleting food log:", error);
  }
};

export const fetchUserFoodHistory = async (uid) => {
  try {
    const userQuery = query(
      collection(db, "userDetails"),
      where("uid", "==", uid)
    );
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      console.log("No user found with UID:", uid);
      return null;
    }

    const userDoc = userSnapshot.docs[0];
    const userId = userDoc.id;

    const foodDocRef = doc(
      db,
      "userDetails",
      userId,
      "foodHistory",
      "foodHistorry"
    );
    const foodDocSnap = await getDoc(foodDocRef);

    if (!foodDocSnap.exists()) {
      console.log("No food history found");
      return null;
    }

    const todayMeal = foodDocSnap.data().todayMeal || {};

    return {
      breakfast: todayMeal.breakfast || [],
      lunch: todayMeal.lunch || [],
      dinner: todayMeal.dinner || [],
    };
  } catch (error) {
    console.error("Error fetching user food history:", error);
    return null;
  }
};

export const updateUserFoodHistory = async (uid, mealType, foodLog) => {
  try {
    const userSnap = await getDocs(
      query(collection(db, "userDetails"), where("uid", "==", uid))
    );

    if (userSnap.empty) throw new Error("User not found");

    const userDoc = userSnap.docs[0];
    const userId = userDoc.id;

    const foodDocRef = doc(
      db,
      "userDetails",
      userId,
      "foodHistory",
      "foodHistorry"
    );

    await updateDoc(foodDocRef, {
      [`todayMeal.${mealType}`]: arrayUnion(foodLog),
    });

    console.log(`Added food log to todayMeal.${mealType}`);
  } catch (error) {
    console.error("Error updating user food history:", error);
  }
};
