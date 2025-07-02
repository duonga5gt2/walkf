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

    // Step 2: Add 'progressChart' document to 'progress' subcollection
    const progressChartRef = doc(
      db,
      "userDetails",
      docRef.id,
      "progress",
      "progressChart"
    );

    await setDoc(progressChartRef, {
      chartData: [
        {
          label: getFormattedDate(),
          value: weight, // Use initial weight to populate the first entry
        },
      ],
    });

    console.log("Progress chart initialized.");
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
