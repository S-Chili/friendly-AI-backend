const natural = require("natural");
const fs = require("fs");
const path = require("path");
const TrainingStatus = require("./models/TrainingStatus");
const TrainingData = require("./models/TrainingData");

const CLASSIFIER_PATH = path.join(__dirname, "classifier.json");
let classifier = new natural.BayesClassifier();
let isClassifierReady = false;
let isClassifierLoading = false;

const loadClassifier = async () => {
  if (isClassifierLoading) {
    console.log("ℹ️ Класифікатор вже завантажується...");
    return false;
  }

  if (isClassifierReady) {
    console.log("✅ Класифікатор вже завантажено.");
    return true;
  }

  if (!fs.existsSync(CLASSIFIER_PATH)) {
    console.warn("⚠️ Файл класифікатора не знайдено.");
    return false;
  }

  console.log("📂 Завантажуємо класифікатор із файлу...");
  isClassifierLoading = true;

  return new Promise((resolve, reject) => {
    natural.BayesClassifier.load(CLASSIFIER_PATH, null, async (err, loaded) => {
      isClassifierLoading = false;
      if (err) {
        console.error("❌ Помилка завантаження класифікатора:", err);
        return reject(false);
      }

      classifier = loaded;
      isClassifierReady = true;
      console.log(
        "✅ Класифікатор завантажено. Документів:",
        classifier.docs.length
      );
      await TrainingStatus.updateOne(
        { model: "yourModel" },
        { isTrained: true },
        { upsert: true }
      );
      resolve(true);
    });
  });
};

const trainModel = async () => {
  console.log("📦 Завантажуємо дані для тренування...");

  const trainingData = await TrainingData.find();
  if (!trainingData || trainingData.length === 0) {
    console.error("❌ Дані для тренування відсутні.");
    return false;
  }

  console.log("📦 Завантажено дані для тренування:", trainingData);

  const newClassifier = new natural.BayesClassifier();
  let validCount = 0;

  trainingData.forEach(({ input, output }, i) => {
    if (
      typeof input === "string" &&
      input.trim() !== "" &&
      typeof output === "string" &&
      output.trim() !== ""
    ) {
      newClassifier.addDocument(input.trim(), output.trim());
      validCount++;
    } else {
      console.warn(`⚠️ Пропущено невалідний запис #${i + 1}`);
    }
  });

  if (validCount === 0) {
    console.error("❌ Немає валідних записів для тренування.");
    return false;
  }

  console.log(`✅ Додано ${validCount} документів. Тренування...`);
  newClassifier.train();

  // Тепер класифікатор готовий
  classifier = newClassifier;
  isClassifierReady = true;

  // Додаткове тестове тренування
  newClassifier.addDocument("Привіт", "Привітання");
  newClassifier.addDocument("Як справи?", "Питання");
  newClassifier.train();

  // Збереження класифікатора після тренування
  newClassifier.save(CLASSIFIER_PATH, (err) => {
    if (err) {
      console.error("❌ Помилка збереження класифікатора", err);
    } else {
      console.log("✅ Класифікатор збережено після тренування");
    }
  });

  await new Promise((resolve, reject) => {
    classifier.save(CLASSIFIER_PATH, (err) => {
      if (err) {
        console.error("❌ Не вдалося зберегти класифікатор:", err);
        return reject(err);
      }
      console.log("💾 Класифікатор збережено:", CLASSIFIER_PATH);
      resolve();
    });
  });

  await TrainingStatus.updateOne(
    { model: "yourModel" },
    { isTrained: true, trainedAt: new Date() },
    { upsert: true }
  );

  console.log("🎉 Модель навчена успішно!");
  return true;
};

const getMLResponse = async (message) => {
  console.log(`📨 Отримано повідомлення: "${message}"`);

  const status = await TrainingStatus.findOne({ model: "yourModel" });
  if (!status?.isTrained) {
    console.error("❌ Модель ще не навчена.");
    return "Моя база знань ще не готова 😞";
  }

  if (!isClassifierReady) {
    const loaded = await loadClassifier();
    if (!loaded) return "Щось пішло не так із навчанням 😔";
  }

  try {
    const response = classifier.classify(message);
    console.log(`🤖 Відповідь: "${response}"`);
    return response || "Цікаве питання! Розкажи більше про це!";
  } catch (err) {
    console.error("❌ Помилка класифікації:", err);
    return "Сталася помилка. Спробуй ще раз!";
  }
};

module.exports = { loadClassifier, trainModel, getMLResponse };
