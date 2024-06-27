describe("products detail page", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com");
    cy.homePageIsVisible();
  });

  it("user can view all products and its details", () => {
    cy.get(".features_items").should("be.visible");
    cy.get('a[href="/product_details/1"]').click();
    cy.url().should("contain", "/product_details/1");
    cy.get(".product-information")
      .as("detalles")
      .within((detalles) => {
        cy.get("img").should("be.visible");
        cy.get("p").should("be.visible");
        cy.get("h2").should("be.visible");
      });
  });

  it("usear searchs for a product", () => {
    cy.get('a[href="/products"]').click();
    cy.contains("All Products").should("be.visible");
    cy.get('a[href="/products"]').click();
  });
});
