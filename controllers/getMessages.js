const Message = require("../models/messageModel");

module.exports = async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Помилка отримання повідомлень" });
  }
};
