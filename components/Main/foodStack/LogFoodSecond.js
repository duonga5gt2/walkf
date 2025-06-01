import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { useState, useRef } from "react";
import { useStyles } from "../../../contexts/StyleContext";
import { useMain } from "../../../contexts/MainContext";
import Icon from "react-native-vector-icons/Ionicons";

export default function LogFoodSecond({ navigation, route }) {
  const { styles } = useStyles();
  const { setTabBarStatus } = useMain();
  const { meal, setMeal } = route.params;

  const [foodList, setFoodList] = useState(meal);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "BGW8EWTP2CA33ISZ9Ke5uKhmUTqCwXjir5PhjZav"; // Replace with your USDA API key
  const API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

  const handleSearch = async (text) => {
    setSearchText(text);

    if (text.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}?query=${text}&api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Extract title (description) and calories
      let formattedResults = data.foods
        .map((item) => {
          const calories = item.foodNutrients?.find(
            (nutrient) => nutrient.nutrientId === 1008
          )?.value;

          const protein = item.foodNutrients?.find(
            (nutrient) => nutrient.nutrientId === 1003
          )?.value;
          return {
            title: item.description,
            protein: protein || 0,
            calories: calories || 0, // Default to 0 if no calories
          };
        })
        .filter((item) => item.calories > 0)
        .filter((item) => item.protein > 0); // Remove items with 0 calories

      // Keep only the highest calorie item for each title
      const uniqueResults = formattedResults.reduce((acc, item) => {
        if (!acc[item.title] || acc[item.title].calories < item.calories) {
          acc[item.title] = item; // Replace with higher calorie item
        }
        return acc;
      }, {});

      // Convert the object back to an array
      const finalResults = Object.values(uniqueResults);

      setResults(finalResults);
    } catch (err) {
      setError("Failed to fetch food data. Please try again.");
      console.error("Error fetching food data:", err);
    } finally {
      setLoading(false);
    }
    // Delay of 500ms
  };

  const [modalVisible, setModalVisible] = useState(false);

  const [modalTitle, setModalTitle] = useState("");

  const [serving, setServing] = useState("");
  const [modalError, setModalError] = useState("");

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [modalData, setModalData] = useState({});

  const removeItem = (itemIndexToRemove) => {
    setFoodList((prevItems) =>
      prevItems.filter((_, index) => index !== itemIndexToRemove)
    );
    setMeal((prevItems) =>
      prevItems.filter((_, index) => index !== itemIndexToRemove)
    );
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Image
          style={styles.topLogo}
          source={require("../../../assets/1-removebg-preview.png")}
        />
        <View style={{ padding: 24 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 13,
              paddingBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                setTabBarStatus(true);
              }}
            >
              <Image source={require("../../../assets/Arrow 1.png")} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Reddit Sans",
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              Log Food
            </Text>
          </View>

          <View style={{ paddingBottom: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Reddit Sans",
                fontWeight: "bold",
              }}
            >
              Logging in today's food
            </Text>
          </View>

          <View>
            <Text style={{ fontFamily: "Reddit Sans", fontWeight: "medium" }}>
              Search for food
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#d9d9d9",
              marginTop: 10,
              borderRadius: 10,
              height: 26,
              borderWidth: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 3,
            }}
          >
            <Icon name="search" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={{ width: "93%" }}
              placeholder="Search for food..."
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
          <View
            style={{
              width: "100%",
              height: 230,
              backgroundColor: "#f5f2f2",
              marginTop: 10,
              padding: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              // Shadow for Android
              elevation: 5,
            }}
          >
            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            {error ? (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{error}</Text>
              </View>
            ) : (
              <ScrollView>
                {results.map((item, index) => (
                  <TouchableWithoutFeedback key={index.toString()}>
                    <View
                      style={{
                        backgroundColor: "#fff",
                        marginBottom: 5,
                        padding: 5,
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ width: 300 }}>
                        <Text
                          style={{
                            fontFamily: "Reddit Sans",
                            fontWeight: "bold",
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text style={{ fontFamily: "Reddit Sans" }}>
                          Calories: {item.calories},
                          <Text> Protein: {item.protein}g per 100g</Text>
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          setModalTitle(item.title);
                          setModalData(item);
                          toggleModal();
                        }}
                        style={{}}
                      >
                        <Icon name="add-circle" size={30} color="#000" />
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </ScrollView>
            )}
          </View>

          <Text
            style={{
              paddingTop: 24,
              fontFamily: "Reddit Sans",
              fontWeight: "medium",
            }}
          >
            Food List
          </Text>
          <View
            style={{
              width: "100%",
              height: 151,

              marginTop: 10,
            }}
          >
            {foodList.length > 0 ? (
              <ScrollView>
                {foodList.map((food, index) => {
                  return (
                    <TouchableWithoutFeedback key={index}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#d9d9d9",
                          padding: 10,
                          borderRadius: 10,
                          marginBottom: 5,
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontFamily: "Reddit Sans",
                              fontWeight: "bold",
                            }}
                          >
                            {food.title}
                          </Text>
                          <Text>
                            Calories: {food.size.toFixed(2)}kcal, Protein:{" "}
                            {food.protein.toFixed(2)}g
                          </Text>
                        </View>
                        <TouchableOpacity onPress={() => removeItem(index)}>
                          <Icon name="trash" size={24} color="#000000" />
                        </TouchableOpacity>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </ScrollView>
            ) : (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>No Food Has Been Logged</Text>
              </View>
            )}
          </View>

          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={toggleModal}
          >
            <View style={styles.modalOverlay}>
              <View
                style={{
                  backgroundColor: "#fff",
                  width: 300,
                  padding: 20,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Reddit Sans",
                      fontSize: 20,
                      fontWeight: "bold",
                      paddingBottom: 10,
                    }}
                  >
                    Add Food
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal();
                      setModalData({});
                    }}
                  >
                    <Icon name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>

                {modalError && (
                  <Text style={{ color: "red", fontFamily: "Reddit Sans" }}>
                    {modalError}
                  </Text>
                )}

                <Text
                  style={{
                    fontFamily: "Reddit Sans",
                    fontWeight: "bold",
                    paddingBottom: 5,
                  }}
                >
                  {modalTitle}
                </Text>

                <View style={{ paddingBottom: 10 }}>
                  <Text>Serving Size (g)</Text>
                  <TextInput
                    placeholder="Serving Size"
                    keyboardType="numeric"
                    value={serving}
                    onChangeText={(value) => {
                      if (/^\d{0,3}$/.test(value)) {
                        setServing(value);
                      }
                    }}
                    maxLength={3}
                    style={{
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 10,
                      marginTop: 8,
                      width: 137,
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#000",
                    padding: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    if (serving) {
                      const s = parseInt(serving) || 0;
                      if (s !== 0) {
                        const updatedFood = {
                          title: modalData.title,
                          size: modalData.calories * (s / 100),
                          protein: modalData.protein * (s / 100),
                        };

                        // Add the updated food to the list
                        setMeal((currentState) => [
                          ...currentState,
                          updatedFood,
                        ]);
                        setFoodList((currentState) => [
                          ...currentState,
                          updatedFood,
                        ]);

                        // Reset modal data and inputs
                        setModalData({});
                        setServing("");
                        toggleModal();
                      } else {
                        Alert.alert("Unexpected Error");
                      }
                    } else {
                      setModalError("Serving Size cannot be empty");
                    }
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      alignSelf: "center",
                      fontFamily: "Reddit Sans",
                      fontWeight: "bold",
                    }}
                  >
                    Add to List
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
