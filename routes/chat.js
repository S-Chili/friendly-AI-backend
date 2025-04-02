const express = require("express");
const router = express.Router();
const { getMLResponse } = require("../mlModel");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ error: "Повідомлення не може бути порожнім" });
    }

    console.log(`📩 Отримано повідомлення: "${message}"`);
    const response = getMLResponse(message);
    console.log(`📤 Відповідь моделі: "${response}"`);

    res.json({ response });
  } catch (error) {
    console.error("❌ Помилка в маршруті /chat:", error);
    res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
});

module.exports = router;
