// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./db");
// const chatRoutes = require("./routes/chat");
// const {
//   getChats,
//   createChat,
//   getMessages,
//   deleteChat,
// } = require("./controllers/index");
// const { loadClassifier, trainModel } = require("./mlModel");

// (async () => {
//   await loadClassifier();
//   // Потім запускаєш Express або trainModel() вручну, якщо потрібно
// })();

// const app = express();
// app.use(express.json());
// app.use(cors());

// (async () => {
//   try {
//     // console.log("🚀 Навчання AI-моделі...");
//     // trainModel();
//     // console.log("✅ Модель успішно навчена!");

//     console.log("🔄 Підключення до MongoDB...");
//     await connectDB();
//     console.log("✅ Підключення до MongoDB встановлено!");
//     console.log("🚀 Навчання AI-моделі...");
//     trainModel();
//     console.log("✅ Модель успішно навчена!");
//     console.log("🚀 Запускаємо сервер...");
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => console.log(`🎉 Сервер працює на порту ${PORT}`));
//   } catch (error) {
//     console.error("❌ Помилка запуску сервера:", error);
//     process.exit(1);
//   }
// })();

// app.use("/chat", chatRoutes);

// app.get("/chats", getChats);
// app.get("/chats/:chatId/messages", getMessages);
// app.post("/chats", createChat);
// app.delete("/chats/:chatId", deleteChat);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const connectDB = require("./db");
const chatRoutes = require("./routes/chat");
const {
  getChats,
  createChat,
  getMessages,
  deleteChat,
} = require("./controllers/index");

const { loadClassifier, trainModel } = require("./mlModel");

const app = express();
app.use(express.json());
app.use(cors());

// 📁 Шлях до classifier.json
const CLASSIFIER_PATH = path.join(__dirname, "classifier.json");

const startServer = async () => {
  try {
    console.log("🔄 Підключення до MongoDB...");
    await connectDB();
    console.log("✅ Підключення до MongoDB встановлено!");

    // 🧠 Перевіряємо наявність файлу класифікатора
    if (fs.existsSync(CLASSIFIER_PATH)) {
      console.log("📂 Знайдено classifier.json. Завантажуємо класифікатор...");
      await loadClassifier();
    } else {
      console.log("⚠️ Файл класифікатора не знайдено. Починаємо тренування...");
      await trainModel();
    }

    // 🚀 Запускаємо сервер
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🎉 Сервер працює на порту ${PORT}`));
  } catch (error) {
    console.error("❌ Помилка запуску сервера:", error);
    process.exit(1);
  }
};

// ✨ Запуск
startServer();

// 📦 Роути
app.use("/chat", chatRoutes);

app.get("/chats", getChats);
app.get("/chats/:chatId/messages", getMessages);
app.post("/chats", createChat);
app.delete("/chats/:chatId", deleteChat);
