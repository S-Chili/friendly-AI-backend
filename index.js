require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const { trainModel } = require("./mlModel");
const chatRoutes = require("./routes/chat");
const {
  getChats,
  createChat,
  getMessages,
  deleteChat,
} = require("./controllers/index");

const app = express();
app.use(express.json());
app.use(cors());

(async () => {
  try {
    console.log("🚀 Навчання AI-моделі...");
    await trainModel();
    console.log("✅ Модель успішно навчена!");

    console.log("🔄 Підключення до MongoDB...");
    await connectDB();
    console.log("✅ Підключення до MongoDB встановлено!");

    console.log("🚀 Запускаємо сервер...");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🎉 Сервер працює на порту ${PORT}`));
  } catch (error) {
    console.error("❌ Помилка запуску сервера:", error);
    process.exit(1);
  }
})();

app.use("/chat", chatRoutes);

app.get("/chats", getChats);
app.get("/chats/:chatId/messages", getMessages);
app.post("/chats", createChat);
app.delete("/chats/:chatId", deleteChat);
