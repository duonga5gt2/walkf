const {onSchedule} = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();

// Daily scheduled function to update progress chart
exports.updateDailyChart = onSchedule(
    {
      schedule: "every day 00:00",
      timeZone: "Australia/Sydney", // Correct way to apply timeZone
    },

    async (context) => {
      const db = admin.firestore();
      const users = await db.collection("userDetails").get();

      users.forEach(async (doc) => {
        const progressRef = db
            .collection("userDetails")
            .doc(doc.id)
            .collection("progress")
            .doc("progressChart");
        const chartDoc = await progressRef.get();

        if (chartDoc.exists) {
          const chartData = chartDoc.data().chartData || [];
          const today = new Date();
          const dateLabel = `${today.getDate()}/${today.getMonth() + 1}`;

          if (!chartData.some((entry) => entry.label === dateLabel)) {
            chartData.push({label: dateLabel, value: doc.data().weight});
            await progressRef.update({chartData});
          }
        }
      });

      console.log("Daily chart update complete.");
    },
);
