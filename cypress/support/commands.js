const { generateRandomUser } = require("../support/utils");

Cypress.Commands.add("userSignUp", () => {
  cy.visit("https://www.automationexercise.com/");
  //check if home page is visible
  cy.get("header").should("be.visible");
  cy.get("#slider").should("be.visible");
  cy.get(".container").should("be.visible");
  ///check if signup/login button exist, then click on it
  cy.get("a[href= '/login']").should("exist").click();
  // Verify 'New User Signup!' is visible
  cy.contains("New User Signup!").should("be.visible");
  //create a random user and fill the form, using 'custom comands' <3s
  const newUser = generateRandomUser();
  const verifiedUser = cy.fillSignUpForm(newUser);
  cy.get('[data-qa="signup-button"]').click();
});
Cypress.Commands.add("generateUSER", () => {
  const newUser = generateRandomUser();
  cy.request({
    method: "POST",
    url: "https://automationexercise.com/api/createAccount",
    failOnStatusCode: false,
    body: "newUser",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    const user = response.body;
    const { email, password } = response.body.user;
    expect(response.status).to.not.be.null;
  });
});
Cypress.Commands.add("fillSignUpForm", (user) => {
  cy.get('[data-qa="signup-name"]').type(user.name);
  cy.get('[data-qa="signup-email"]').type(user.email);
});

Cypress.Commands.add("fillAccountInformation", (user) => {
  cy.get("#id_gender1").click();
  cy.get('input[data-qa="name"]').type(user.name);
  cy.get('input[data-qa="password"]').type(user.password);
  cy.get('input[data-qa="email"]').type("annydoe@gmail.com", { force: true });
  cy.get("#days").select("14").should("have.value", "14");
  cy.get('[data-qa="months"]').select("11").should("have.value", "11");
  cy.get('[data-qa="years"]').select("1994").should("have.value", "1994");
  cy.get('input[data-qa="first_name"]').type(user.firstname);
  cy.get('input[data-qa="last_name"]').type(user.lastname);
  cy.get('input[data-qa="company"]').type(user.company);
  cy.get('input[data-qa="address"]').type(user.address1);
  cy.get('input[data-qa="address2"]').type(user.address2);
  cy.get('[data-qa="country"]')
    .select("Australia")
    .should("have.value", "Australia");
  cy.get('input[data-qa="state"]').type(user.state);
  cy.get('input[data-qa="city"]').type(user.city);
  cy.get('input[data-qa="zipcode"]').type(user.zipcode);
  cy.get('input[data-qa="mobile_number"]').type(user.mobile_number);
  cy.get('[data-qa="create-account"]').click();
});

Cypress.Commands.add("deleteUser", (user) => {
  cy.request({
    method: "DELETE",
    url: "https://automationexercise.com/api/deleteAccount",
    body: user,
  }).then((response) => {
    cy.get("a[href='/delete_account']").click();
    cy.contains("Account Deleted").should("be.visible");
  });
});

Cypress.Commands.add("userSignIn", (user) => {});
