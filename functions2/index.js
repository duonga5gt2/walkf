const { onSchedule } = require("firebase-functions/v2/scheduler");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const admin = require("firebase-admin");

admin.initializeApp();
const db = getFirestore();

exports.updateSDHistory = onSchedule(
  {
    schedule: "every day 00:00",
    timeZone: "Australia/Sydney",
  },
  async () => {
    console.log("🔥 updateSDHistory triggered");

    try {
      const usersSnapshot = await db.collection("userDetails").get();
      console.log("👥 Total users:", usersSnapshot.size);

      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const userData = userDoc.data();

        const {
          weight,
          height,
          age, // Firestore Timestamp (date of birth)
          gender, // true = male, false = female
          activityLevel,
        } = userData;

        // Field validation
        if (
          weight === null ||
          weight === undefined ||
          height === null ||
          height === undefined ||
          age === null ||
          age === undefined ||
          gender === undefined ||
          gender === null
        ) {
          console.log(`⚠️ Skipping ${userId} — missing fields`, {
            weight,
            height,
            age,
            gender,
          });
          continue;
        }

        // Convert Firestore Timestamp to actual age in years
        const dob = age.toDate();
        const today = new Date();
        let ageYears = today.getFullYear() - dob.getFullYear();
        if (
          today.getMonth() < dob.getMonth() ||
          (today.getMonth() === dob.getMonth() &&
            today.getDate() < dob.getDate())
        ) {
          ageYears--;
        }

        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr = gender
          ? 10 * weight + 6.25 * height - 5 * ageYears + 5
          : 10 * weight + 6.25 * height - 5 * ageYears - 161;

        // Convert activity level to multiplier
        const activityMap = {
          Sedentary: 1.2,
          "Lightly Active": 1.375,
          "Moderately Active": 1.55,
          "Very Active": 1.725,
          "Extra Active": 1.9,
        };
        const activityMultiplier = activityMap[activityLevel] || 1.2;
        const tdee = bmr * activityMultiplier;

        // Get meal data
        const foodDoc = await db
          .collection("userDetails")
          .doc(userId)
          .collection("foodHistory")
          .doc("foodHistory")
          .get();

        if (!foodDoc.exists) {
          console.log(`⚠️ Skipping ${userId} — no foodHistory doc`);
          continue;
        }

        const foodData = foodDoc.data();
        const todayMeal = {
          breakfast: foodData.breakfast || [],
          lunch: foodData.lunch || [],
          dinner: foodData.dinner || [],
        };

        // Calculate intake and protein
        let intake = 0;
        let proteinTotal = 0;

        for (const meal of ["breakfast", "lunch", "dinner"]) {
          const foods = todayMeal[meal];
          for (const item of foods) {
            intake += item?.food?.size || 0;
            proteinTotal += item?.food?.protein || 0;
          }
        }

        const tef = proteinTotal * 4 * 0.25;
        const expenditure = tdee + tef;
        const difference = intake - expenditure;

        // Save result
        const sdRef = db
          .collection("userDetails")
          .doc(userId)
          .collection("SDHistory")
          .doc("SDHistory");

        await sdRef.set(
          {
            history: admin.firestore.FieldValue.arrayUnion({
              date: Timestamp.now(),
              value: difference,
            }),
          },
          { merge: true }
        );

        console.log(
          `✅ User ${userId}: Intake=${intake}, Expenditure=${expenditure}, Δ=${difference}`
        );
      }
    } catch (error) {
      console.error("❌ Error updating SDHistory:", error);
    }
  }
);

exports.deleteDailyFoodHistory = onSchedule(
  { schedule: "every day 00:01", timeZone: "Australia/Sydney" },
  async () => {
    console.log("🧹 deleteDailyFoodHistory triggered");

    try {
      const usersSnapshot = await db.collection("userDetails").get();
      console.log("👥 Total users:", usersSnapshot.size);

      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const foodDocRef = db
          .collection("userDetails")
          .doc(userId)
          .collection("foodHistory")
          .doc("foodHistory");

        await foodDocRef.set({
          breakfast: [],
          lunch: [],
          dinner: [],
        });

        console.log(`🗑️ Cleared foodHistory for user ${userId}`);
      }
    } catch (error) {
      console.error("❌ Error clearing foodHistory:", error);
    }
  }
);
