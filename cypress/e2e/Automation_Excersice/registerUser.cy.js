const { generateRandomUser } = require("../../support/utils");
describe("Register user", () => {
  before(() => {
    cy.visit("https://www.automationexercise.com/");
  });

  it("user can sign up ", () => {
    cy.userSignUp();
  });
  it("user can fill account information, log in and delete user", () => {
    cy.userSignUp();
    cy.contains("Enter Account Information").should("be.visible");
    const userAccountInformation = generateRandomUser();
    cy.fillAccountInformation(userAccountInformation);
    cy.contains("Account Created!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
    cy.contains("Logged in as").should("be.visible");
  });

  it("user tries to register with already in use email", () => {
    cy.visit("https://www.automationexercise.com/");
    cy.get("header").should("be.visible");
    cy.get("#slider").should("be.visible");
    cy.get(".container").should("be.visible");
    cy.get("a[href= '/login']").should("exist").click();
    cy.contains("New User Signup!").should("be.visible");

    cy.fixture("existingUser").then((existingUserData) => {
      cy.get('[data-qa="signup-name"]').type(existingUserData.name);
      cy.get('[data-qa="signup-email"]').type(existingUserData.email);
    });
    cy.get('[data-qa="signup-button"]').click();
    cy.contains("Email Address already exist!").should("be.visible");
  });
});
