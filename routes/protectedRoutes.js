const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Це захищений маршрут", userId: req.user.userId });
});

module.exports = router;
