const mongoose = require("mongoose");

const trainingStatusSchema = new mongoose.Schema({
  model: { type: String, required: true }, // Назва моделі
  isTrained: { type: Boolean, default: false }, // Статус навчання
});

const TrainingStatus = mongoose.model("TrainingStatus", trainingStatusSchema);

module.exports = TrainingStatus;
