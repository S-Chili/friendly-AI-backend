const Message = require("../models/messageModel");
const { getMLResponse } = require("../mlModel");

module.exports = async (req, res) => {
  const { chatId, message } = req.body;
  if (!message || !chatId) {
    return res.status(400).json({ error: "chatId і message обов'язкові" });
  }

  const response = getMLResponse(message);

  try {
    console.log("📩 Збереження повідомлення у БД:", {
      chatId,
      userMessage: message,
      botResponse: response,
    });

    const newMessage = new Message({
      chatId,
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
};
