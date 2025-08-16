const loadClassifier = async () => {
  console.log("ℹ️ loadClassifier викликається, але тренування відсутнє.");
  return false; // завжди повертає false
};

const getMLResponse = async (message) => {
  console.log(`📨 Отримано повідомлення: "${message}"`);
  // завжди повертаємо заглушку
  return "Моя база знань ще не готова 😞";
};

module.exports = { loadClassifier, getMLResponse };
