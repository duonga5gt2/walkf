import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value, uid) => {
  try {
    const data = {
      uid,
      value, // Store the value directly
      date: new Date().toISOString(), // Add timestamp
    };
    console.log(`Storing data for key "${key}":`, data); // Debug log
    await AsyncStorage.setItem(key, JSON.stringify(data));
    console.log(`Data stored successfully for key "${key}"`);
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

export const getData = async (key, uidUser) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log(`Retrieved raw value for key "${key}":`, jsonValue); // Debug log
    if (jsonValue !== null) {
      const storedData = JSON.parse(jsonValue);
      const storedDate = new Date(storedData.date);
      const uid = storedData.uid;
      const currentDate = new Date();

      console.log(`Stored date: ${storedDate}, Current date: ${currentDate}`); // Debug log

      // Check if the stored data is from the same day
      if (
        storedDate.getFullYear() === currentDate.getFullYear() &&
        storedDate.getMonth() === currentDate.getMonth() &&
        storedDate.getDate() === currentDate.getDate() &&
        uid === uidUser
      ) {
        console.log(`Data for key "${key}" is valid for today.`);
        return storedData.value;
      } else {
        await AsyncStorage.removeItem(key);
        console.log(`Data for key "${key}" expired and removed.`);
        return null;
      }
    }
    console.log(`No data found for key "${key}"`);
    return null;
  } catch (error) {
    console.error(`Error retrieving data for key "${key}":`, error);
    return null;
  }
};
