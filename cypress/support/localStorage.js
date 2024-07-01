function getUserFromLocalStorage() {
  return cy.window().then((win) => {
    const storedUser = JSON.parse(win.localStorage.getItem("user"));
    if (!storedUser) {
      throw new Error("No user data found in local storage");
    }
    return storedUser;
  });
}

module.exports = {
  getUserFromLocalStorage,
};
