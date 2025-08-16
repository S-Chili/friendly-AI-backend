const express = require("express");
const router = express.Router();
const axios = require("axios");
const Message = require("../models/messageModel");

router.post("/", async (req, res) => {
  const { chatId, message } = req.body;

  if (!message || !chatId) {
    return res.status(400).json({ error: "chatId і message обов'язкові" });
  }

  try {
    const pythonResponse = await axios.post(
      "https://anastasiiame.pythonanywhere.com/ask",
      {
        text: message,
      }
    );

    // ✅ ВИПРАВЛЕНО ТУТ: беремо лише значення з поля "response"
    const botResponseText = pythonResponse.data.response;

    if (!botResponseText) {
      return res
        .status(400)
        .json({ response: "Щось пішло не так, спробуй ще раз!" });
    }

    // 📩 Зберігаємо повідомлення в базу даних
    const newMessage = new Message({
      chatId,
      userMessage: message.trim(),
      botResponse: botResponseText, // ✅ ВИПРАВЛЕНО ТУТ
    });

    await newMessage.save();

    res.json({ response: botResponseText }); // ✅ І ТУТ
  } catch (error) {
    console.error("❌ Помилка надсилання повідомлення:", error);
    res.status(500).json({ error: "Помилка надсилання повідомлення" });
  }
});

module.exports = router;
