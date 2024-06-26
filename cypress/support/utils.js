// cypress/support/randomUser.js

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

function getRandomEmail() {
  const domains = ["mail.com", "example.com", "test.com"];
  return `${getRandomString(10)}@${
    domains[Math.floor(Math.random() * domains.length)]
  }`;
}

const titles = ["Mr", "Mrs", "Miss"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function generateRandomUser() {
  return {
    name: `${getRandomString(5)} ${getRandomString(7)}`,
    email: getRandomEmail(),
    password: getRandomString(12),
    title: titles[getRandomInt(0, titles.length - 1)],
    birth_date: `${getRandomInt(1, 31)}`,
    birth_month: months[getRandomInt(0, months.length - 1)],
    birth_year: `${getRandomInt(1970, 2000)}`,
    firstname: getRandomString(5),
    lastname: getRandomString(7),
    company: `${getRandomString(5)} Enterprises`,
    address1: `${getRandomInt(1, 9999)} ${getRandomString(10)} St.`,
    address2: `Apt ${getRandomInt(1, 10)}B`,
    country: "United States",
    zipcode: `${getRandomInt(10000, 99999)}`,
    state: "NY",
    city: "New York",
    mobile_number: `${getRandomInt(100, 999)}-${getRandomInt(
      100,
      999
    )}-${getRandomInt(1000, 9999)}`,
  };
}

module.exports = {
  generateRandomUser,
};
