let isTrained = false;

const setIsTrained = (value) => {
  console.log(`🔧 Зміна статусу isTrained на: ${value}`);
  isTrained = value;
  console.log(`📢 Перевірка після зміни: isTrained = ${isTrained}`);
};

const getIsTrained = () => {
  console.log(`📢 Виклик getIsTrained: ${isTrained}`);
  return isTrained;
};

module.exports = { setIsTrained, getIsTrained };
