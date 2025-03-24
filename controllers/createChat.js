const Chat = require("../models/chatModel");

module.exports = async (req, res) => {
  try {
    const newChat = new Chat({ name: "Новий чат" });
    await newChat.save();
    res.json(newChat);
  } catch (error) {
    res.status(500).json({ error: "Не вдалося створити чат" });
  }
};
