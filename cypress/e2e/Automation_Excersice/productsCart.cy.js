describe("Products in cart", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com");
    cy.homePageIsVisible();
  });

  it("user can add products to cart", () => {
    cy.get(".features_items").should("be.visible");
    cy.get('a[href="/products"]').click();

    cy.get(".product-image-wrapper").as("products");

    // Get the total number of products
    cy.get("@products")
      .its("length")
      .then((productCount) => {
        cy.get("@products").each(($product, index) => {
          // Hover over the product
          cy.wrap($product)
            .find(".single-products")
            .trigger("mouseover", { force: true });

          // Click the "Add to cart" button
          cy.wrap($product)
            .find("a[data-product-id]")
            .then(($button) => {
              // Click the button using native DOM method to avoid multiple element click error
              $button[0].click();
            });

          // Handle the popup
          cy.get("div.modal-content").within(() => {
            if (index === productCount - 1) {
              // Click "View Cart" button for the last product
              cy.contains("View Cart").click();
            } else {
              // Click "Continue Shopping" for other products
              cy.contains("Continue Shopping").click();
            }
          });
        });
      });
  });
});
