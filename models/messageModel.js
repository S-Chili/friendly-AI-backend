const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Chat" }, // Додаємо chatId
  userMessage: { type: String, required: true },
  botResponse: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
