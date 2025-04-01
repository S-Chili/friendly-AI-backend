require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const { getIsTrained, setIsTrained } = require("./state");
const { trainModel } = require("./mlModel"); // Додаємо імпорт trainModel

const {
  getChats,
  createChat,
  getMessages,
  deleteChat,
} = require("./controllers/index");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const chatRoutes = require("./routes/chat");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// ✅ Навчання моделі (асинхронно)
trainModel()
  .then(() => {
    setIsTrained(true);
    console.log("✅ AI-Lilu готовий до роботи!");
  })
  .catch((error) => {
    console.error("❌ Помилка при навчанні моделі:", error);
  });

// 📌 Використання маршрутів не залежить від навчання моделі
app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/chat", chatRoutes);

app.get("/chats", getChats);
app.get("/chats/:chatId/messages", getMessages);
app.post("/chats", createChat);
app.delete("/chats/:chatId", deleteChat);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 AI-Lilu працює на порту ${PORT}`));
