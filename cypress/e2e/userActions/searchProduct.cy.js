describe("search product", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com");
    cy.homePageIsVisible();
  });

  it("user searchs for a product", () => {
    cy.get('a[href="/products"]').click();
    cy.contains("All Products").should("be.visible");
    cy.get("div.product-image-wrapper p").each(($p) => {
      const text = $p.text();
      cy.get('input[name="search"]').clear().type(text);
      cy.get("#submit_search").click();
      cy.get(".features_items").should("contain", text);
    });
  });
});
