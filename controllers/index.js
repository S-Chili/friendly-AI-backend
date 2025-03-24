const getChats = require("./getChats");
const getMessages = require("./getMessages");
const createChat = require("./createChat");
const sendMessage = require("./sendMessage");
const deleteChat = require("./deleteChat");
const { login, register } = require("./authController");

module.exports = {
  getChats,
  getMessages,
  createChat,
  sendMessage,
  deleteChat,
  login,
  register,
};
