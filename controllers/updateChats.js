const Chat = require("../models/chatModel");

module.exports = async (req, res) => {
  try {
    const { chatId } = req.params; // Отримуємо ID чату з URL
    const { newName } = req.body; // Отримуємо нову назву з тіла запиту

    // Перевіряємо, чи надано нову назву
    if (!newName) {
      return res.status(400).json({ error: "Нова назва чату обов'язкова" });
    }

    // Знаходимо чат за ID і оновлюємо його
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { name: newName },
      { new: true } // Повертаємо оновлений документ
    );

    // Якщо чат не знайдено, повертаємо помилку 404
    if (!updatedChat) {
      return res.status(404).json({ error: "Чат не знайдено" });
    }

    // Повертаємо оновлений чат
    res.json(updatedChat);
  } catch (error) {
    console.error("❌ Помилка оновлення чату:", error);
    res.status(500).json({ error: "Не вдалося оновити чат" });
  }
};
