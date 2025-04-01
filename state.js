let isTrained = false;

function setIsTrained(value) {
  isTrained = value;
  console.log("🔍 Статус навчання моделі:", isTrained);
}

function getIsTrained() {
  return isTrained;
}

module.exports = { getIsTrained, setIsTrained };
