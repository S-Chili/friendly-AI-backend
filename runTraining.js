const { trainModel } = require("./mlModel");

trainModel().then(() => {
  console.log("🏁 Навчання завершено");
  process.exit();
});
