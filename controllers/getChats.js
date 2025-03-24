const Chat = require("../models/chatModel");

module.exports = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося отримати чати" });
  }
};
