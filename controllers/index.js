const getChats = require("./getChats");
const getMessages = require("./getMessages");
const createChat = require("./createChat");
const deleteChat = require("./deleteChat");
const { login, register } = require("./authController");

module.exports = {
  getChats,
  getMessages,
  createChat,
  deleteChat,
  login,
  register,
};
