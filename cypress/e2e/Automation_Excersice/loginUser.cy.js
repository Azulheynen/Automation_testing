import "cypress-localstorage-commands";

describe("Login", () => {
  before(() => {
    cy.visit("http://automationexercise.com");
  });

  it("user can enter home page and loggs in", () => {
    cy.get("header").should("be.visible");
    cy.get("#slider").should("be.visible");
    cy.get(".container").should("be.visible");
    cy.visit("https://www.automationexercise.com/");

    cy.get('a[href="/login" ]').click();
    cy.contains("Login to your account").should("be.visible");
    cy.get('[data-qa="login-email"]').type("alicia@getnede.com");
    cy.get('[data-qa="login-password"]').type("Alicia@1");
    cy.get('[data-qa="login-button"]').click();
    cy.contains("Logged in as").should("be.visible");
  });

  it("user try to login with invalid email and password", () => {
    cy.visit("https://www.automationexercise.com/");
    cy.get("header").should("be.visible");
    cy.get("#slider").should("be.visible");
    cy.get(".container").should("be.visible");
    cy.get('a[href="/login" ]').click();
    cy.contains("Login to your account").should("be.visible");
    cy.get('[data-qa="login-email"]').type("notvalis@getnede.com");
    cy.get('[data-qa="login-password"]').type("notvalid123");
    cy.get('[data-qa="login-button"]').click();
    cy.contains("Your email or password is incorrect!").should("be.visible");
  });

  it("user can enter home page and loggs in", () => {
    cy.visit("https://www.automationexercise.com/");
    cy.get("header").should("be.visible");
    cy.get("#slider").should("be.visible");
    cy.get(".container").should("be.visible");
    cy.get('a[href="/login" ]').click();
    cy.contains("Login to your account").should("be.visible");
    cy.get('[data-qa="login-email"]').type("alicia@getnede.com");
    cy.get('[data-qa="login-password"]').type("Alicia@1");
    cy.get('[data-qa="login-button"]').click();
    cy.contains("Logged in as").should("be.visible");
    cy.get('a[href="/logout" ]').click();
    cy.url().should("contain", "/login");
  });
});
