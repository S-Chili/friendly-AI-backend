const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

module.exports = async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      return res.status(400).json({ error: "chatId обов'язковий" });
    }

    await Message.deleteMany({ chatId }); // Видалення всіх повідомлень чату
    const deletedChat = await Chat.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return res.status(404).json({ error: "Чат не знайдено" });
    }

    res.json({ message: "Чат успішно видалено" });
  } catch (error) {
    res.status(500).json({ error: "Помилка видалення чату" });
  }
};
