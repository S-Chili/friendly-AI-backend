// ai-friend-backend/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const { getResponse } = require("./aiLogic"); // Імпортуємо логіку
const connectDB = require("./db"); // Підключення до БД
const Message = require("./model/messageModel"); // Модель для збереження історії
const Chat = require("./model/chatModel");

connectDB(); // Запускаємо підключення до БД
app.get("/chats", async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося отримати чати" });
  }
});

app.get("/chats/:chatId/messages", async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Помилка отримання повідомлень" });
  }
});

app.post("/chats", async (req, res) => {
  try {
    const newChat = new Chat({ name: "Новий чат" });
    await newChat.save();
    res.json(newChat);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося створити чат" });
  }
});

app.post("/chat", async (req, res) => {
  const { chatId, message } = req.body;
  if (!message || !chatId) {
    return res.status(400).json({ error: "chatId і message обов'язкові" });
  }

  const response = getResponse(message);

  try {
    console.log("📩 Збереження повідомлення у БД:", {
      chatId,
      userMessage: message,
      botResponse: response,
    });

    const newMessage = new Message({
      chatId, // Додаємо chatId
      userMessage: message,
      botResponse: response,
    });
    await newMessage.save();
    console.log("✅ Повідомлення збережено!");
    res.json({ response });
  } catch (error) {
    console.error("❌ Помилка збереження повідомлення:", error);
    res.status(500).json({ error: "Помилка збереження повідомлення" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`AI-Lilu працює на порту ${PORT}`));
