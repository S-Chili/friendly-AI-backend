const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

const connectDB = async () => {
  console.log("🔄 Підключення до MongoDB...");
  console.log("🌐 URI:", uri);

  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("✅ MongoDB підключено!");
  } catch (error) {
    console.error("❌ Помилка підключення до MongoDB:", error.message);
    console.error("❗ Повна помилка:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
