// cypress/support/randomCreditCard.js

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomString(length) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getRandomCardNumber() {
  let cardNumber = "";
  for (let i = 0; i < 16; i++) {
    cardNumber += Math.floor(Math.random() * 10).toString();
  }
  return cardNumber;
}

function getRandomCVC() {
  return getRandomInt(100, 999).toString();
}

function getRandomExpiryMonth() {
  const month = getRandomInt(1, 12);
  return month < 10 ? `0${month}` : month.toString();
}

function getRandomExpiryYear() {
  const currentYear = new Date().getFullYear();
  const year = currentYear + getRandomInt(1, 5); // Random year between current year and next 5 years
  return year.toString();
}

function generateRandomCreditCard() {
  return {
    nameOnCard: `${getRandomString(5)} ${getRandomString(7)}`,
    cardNumber: getRandomCardNumber(),
    cvc: getRandomCVC(),
    expiryMonth: getRandomExpiryMonth(),
    expiryYear: getRandomExpiryYear(),
  };
}

module.exports = {
  generateRandomCreditCard,
};
