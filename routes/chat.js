const express = require("express");
const router = express.Router();
const { getMLResponse } = require("../mlModel");

const { getIsTrained } = require("../state");

router.post("/", async (req, res) => {
  console.log("🔍 Статус навчання моделі:", getIsTrained());

  if (!getIsTrained()) {
    return res.status(503).json({ error: "Модель ще не навчена!" });
  }

  const { message } = req.body;
  const response = getMLResponse(message);

  console.log("📩 Відправляємо відповідь клієнту:", response);

  res.json({ response });
});

module.exports = router;
