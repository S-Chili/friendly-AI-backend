const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Реєстрація
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: "Всі поля обов'язкові: email, password, firstName, lastName",
      });
    }

    // Перевірка, чи вже існує користувач
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Користувач вже існує" });
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();

    res.status(201).json({ message: "Користувач зареєстрований" });
  } catch (error) {
    console.error("❌ Помилка реєстрації:", error);
    res.status(500).json({ error: "Помилка реєстрації" });
  }
};

// Логін
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email і пароль обов'язкові" });
    }

    // Пошук користувача
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Невірний email або пароль" });
    }

    // Перевірка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Невірний email або пароль" });
    }

    // Генерація JWT
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Помилка входу" });
  }
};
