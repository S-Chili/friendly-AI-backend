const mongoose = require("mongoose");

const trainingDataSchema = new mongoose.Schema({
  input: { type: String, required: true }, // Запит користувача
  output: { type: String, required: true }, // Відповідь AI
});

const TrainingData = mongoose.model("TrainingData", trainingDataSchema);

module.exports = TrainingData;
