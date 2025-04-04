const TrainingData = require("../models/TrainingData");
const TrainingStatus = require("../models/TrainingStatus");

const saveTrainingData = async (data) => {
  if (!Array.isArray(data)) {
    console.error("❌ Помилка: Отримані дані не є масивом!");
    return;
  }

  try {
    const operations = data.map(async (item) => {
      const exists = await TrainingData.findOne({ input: item.input });
      if (!exists) {
        await TrainingData.create(item);
        console.log(`✅ Додано: "${item.input}" -> "${item.output}"`);
      } else {
        console.log(`⚠️ Пропущено (вже існує): "${item.input}"`);
      }
    });

    await Promise.all(operations);

    console.log("✅ Усі дані збережено!");

    const trainingStatus = await TrainingStatus.findOneAndUpdate(
      { model: "yourModel" },
      { isTrained: true },
      { new: true, upsert: true }
    );

    console.log("Статус оновлено:", trainingStatus.isTrained);
  } catch (error) {
    console.error("❌ Помилка збереження в MongoDB:", error);
  }
};

module.exports = { saveTrainingData };
