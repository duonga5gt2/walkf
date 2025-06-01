import React, { useState } from "react";
import { View, Text, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateOfBirthInput = () => {
  const [date, setDate] = useState(new Date()); // Default to current date
  const [show, setShow] = useState(false); // Controls visibility of the picker

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios"); // Keep the picker open for iOS
    if (selectedDate) {
      setDate(selectedDate); // Update the selected date
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>Date of Birth:</Text>
      <Button title={date.toDateString()} onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"} // Display style varies by platform
          onChange={onChange}
          maximumDate={new Date()} // Restrict to today's date or earlier
        />
      )}
    </View>
  );
};

export default DateOfBirthInput;
