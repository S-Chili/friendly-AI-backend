require("dotenv").config();
const mongoose = require("mongoose");
const TrainingData = require("./models/TrainingData"); // Імпорт моделі
const trainingData = require("./mlData"); // Файл з твоїм масивом даних

const uri = process.env.MONGO_URI;

const addTrainingData = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ Підключено до MongoDB");

    for (const item of trainingData) {
      const exists = await TrainingData.findOne({ input: item.input });
      if (!exists) {
        await TrainingData.create(item);
        console.log(`✅ Додано: "${item.input}" -> "${item.output}"`);
      } else {
        console.log(`⚠️ Вже існує: "${item.input}"`);
      }
    }

    console.log("✅ Усі дані успішно додано!");
    process.exit();
  } catch (error) {
    console.error("❌ Помилка додавання в базу:", error);
    process.exit(1);
  }
};

addTrainingData();
