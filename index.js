// ai-friend-backend/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const { getResponse } = require("./aiLogic"); // Імпортуємо логіку
const connectDB = require("./db"); // Підключення до БД
const Message = require("./messageModel"); // Модель для збереження історії

connectDB(); // Запускаємо підключення до БД

// Ендпоінт для отримання відповіді
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res
      .status(400)
      .json({ error: "Повідомлення не може бути порожнім" });
  }

  const response = getResponse(message);

  // Збереження повідомлення в базу даних
  // Збереження повідомлення в базу даних
  try {
    console.log("📩 Збереження повідомлення у БД:", {
      userMessage: message,
      botResponse: response,
    });
    const newMessage = new Message({
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
