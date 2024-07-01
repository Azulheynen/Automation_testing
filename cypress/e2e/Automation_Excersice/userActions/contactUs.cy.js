describe("contact us", () => {
  before(() => {
    cy.visit("http://automationexercise.com");
  });

  it("redirects to contact form, fills and submits, then navigates back to home page", () => {
    cy.homePageIsVisible();
    cy.get('a[href="/contact_us"]').click();
    cy.contains("Get In Touch").should("be.visible");
    cy.get('[data-qa="name"]').type("person");
    cy.get('[data-qa="email"]').type("email@emsl.com");
    cy.get('[data-qa="subject"]').type("messege");
    cy.get('[data-qa="message"]').type("lorem ipsum");
    cy.get('input[type = "file"]').selectFile(
      "/Users/azul/Desktop/automation testng/cypress/image4test.png"
    );
    cy.get('[data-qa="submit-button"]').click();
    cy.contains(
      "Success! Your details have been submitted successfully"
    ).should("be.visible");
    cy.get("#form-section").find("a").click();
    cy.homePageIsVisible();
  });
});
