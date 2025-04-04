const express = require("express");
const router = express.Router();
const { getMLResponse } = require("../mlModel");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await getMLResponse(message);
    if (!response) {
      return res
        .status(400)
        .json({ response: "Щось пішло не так, спробуй ще раз!" });
    }

    // Повертаємо відповідь
    return res.status(200).json({ response });
  } catch (error) {
    console.error("Помилка обробки повідомлення:", error);
    return res
      .status(500)
      .json({ response: "Сталася помилка при обробці запиту." });
  }
});

module.exports = router;
