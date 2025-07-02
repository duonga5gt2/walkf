const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");

admin.initializeApp();

// Daily scheduled function to update progress chart
exports.updateDailyChart = onSchedule({
  schedule: "every day 00:00",
  timeZone: "Australia/Sydney", // Correct way to apply timeZone
});
