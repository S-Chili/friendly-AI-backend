require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const chatRoutes = require("./routes/chat");
const {
  getChats,
  createChat,
  getMessages,
  deleteChat,
  updatedChat,
} = require("./controllers/index");

const app = express();
app.use(express.json());
app.use(cors());

const startServer = async () => {
  try {
    console.log("🔄 Підключення до MongoDB...");
    await connectDB();
    console.log("✅ Підключення до MongoDB встановлено!");

    // 🚀 Запускаємо сервер
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🎉 Сервер працює на порту ${PORT}`));
  } catch (error) {
    console.error("❌ Помилка запуску сервера:", error);
    process.exit(1);
  }
};

startServer();

// 📦 Роути
app.use("/chat", chatRoutes);

app.get("/chats", getChats);
app.get("/chats/:chatId/messages", getMessages);
app.post("/chats", createChat);
app.delete("/chats/:chatId", deleteChat);
app.put("/chats/:chatId", updatedChat);
