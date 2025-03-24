const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Немає токена, доступ заборонено" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Невірний токен" });
  }
};
