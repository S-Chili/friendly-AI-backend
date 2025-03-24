// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const {
  getChats,
  createChat,
  sendMessage,
  getMessages,
  deleteChat,
} = require("./controllers/index");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);
app.get("/chats", getChats);
app.get("/chats/:chatId/messages", getMessages);
app.post("/chats", createChat);
app.post("/chat", sendMessage);
app.delete("/chats/:chatId", deleteChat);

const PORT = 3000;
app.listen(PORT, () => console.log(`AI-Lilu працює на порту ${PORT}`));
