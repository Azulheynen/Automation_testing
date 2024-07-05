const { generateRandomUser } = require("../../support/utils");

const {
  generateRandomCreditCard,
} = require("../../support/randomCreditCard");

describe("Products in cart", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com");
    cy.homePageIsVisible();
  });

  it("user is ready to check out, signs up, fills credit card fields and confirms purchase", () => {
    cy.get('a[href="/products"]').click();
    cy.get(".product-image-wrapper").as("products");
    cy.get("@products").find(".single-products").first();
    cy.get('[data-product-id="1"]').contains("Add to cart").click();
    cy.get('a[href="/view_cart"]').contains("View Cart").click();
    cy.get("a").contains("Proceed To Checkout").click();
    cy.get('a[href="/login"]').contains("Register / Login").click();
    cy.contains("New User Signup!").should("be.visible");
    const newUser = generateRandomUser();
    const verifiedUser = cy.fillSignUpForm(newUser);
    cy.get('[data-qa="signup-button"]').click();
    cy.fillAccountInformation(newUser);
    cy.get("h2").contains("Account Created!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
    cy.contains("Logged in as").should("be.visible");
    cy.get('a[href="/view_cart"]').first().click();
    cy.get("a").contains("Proceed To Checkout").click();
    cy.get("#address_delivery").contains(newUser.address1);
    cy.get("#address_delivery").contains(newUser.address2);
    cy.get("#address_delivery").contains(newUser.zipcode);
    cy.get("#address_delivery").contains(newUser.mobile_number);
    cy.get("#address_invoice").contains(newUser.address1);
    cy.get("#address_invoice").contains(newUser.address2);
    cy.get("#address_invoice").contains(newUser.zipcode);
    cy.get("#address_invoice").contains(newUser.mobile_number);
    cy.get("#ordermsg")
      .find(".form-control")
      .type("ksandkdnsknkasndksnfskdnfsk");
    cy.get('a[href="/payment"]').click();
    const creditCardData = generateRandomCreditCard();
    cy.get('[data-qa="name-on-card"]').type(creditCardData.nameOnCard);
    cy.get('[data-qa="card-number"]').type(creditCardData.cardNumber);
    cy.get('[data-qa="cvc"]').type(creditCardData.cvc);
    cy.get('[data-qa="expiry-month"]').type(creditCardData.expiryMonth);
    cy.get('[data-qa="expiry-year"]').type(creditCardData.expiryYear);
    cy.get('[data-qa="pay-button"]').click();
    cy.get('[data-qa="continue-button"]').click();
  });
});
