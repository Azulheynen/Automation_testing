describe("Products in cart", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com");
    cy.homePageIsVisible();
  });

  it("user can add products to cart", () => {
    cy.addProductsToCart();
  });

  it.only("user added x products, cart has x products", () => {
    cy.get(".features_items").should("be.visible");
    cy.get('a[href="/products"]').click();

    cy.get(".product-image-wrapper").as("products");
    cy.get("@products")
      .its("length")
      .then((product) => {
        const products = [
          { productId: 1, quantity: 4 },
          { productId: 2, quantity: 2 },
          { productId: 3, quantity: 1 },
          // Add more products as needed
        ];
        cy.wrap(products).each((product) => {
          cy.get(`a[href="/product_details/${product.productId}"]`)
            .first()
            .click();
          cy.get("input#quantity").clear().type(product.quantity.toString());
          cy.get("button[type='button']").click();
          cy.get("div.modal-content").contains("View Cart").click();
          cy.get(".cart_quantity").should(
            "contain",
            product.quantity.toString()
          );
          cy.go(-2);
        });
      });
  });
});
