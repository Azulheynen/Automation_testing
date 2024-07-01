describe("remove products from cart", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com");
    cy.homePageIsVisible();
  });

  it("user can delete added products from cart", () => {
    cy.addProductsToCart();
    cy.get('a[href="/view_cart"]').first().click();
    /////////
    cy.get("tbody").as("productsCart");
    cy.get("@productsCart")
      .its("length")
      .then((product) => {
        const products = [
          { productId: 1, quantity: 4 },
          { productId: 2, quantity: 2 },
          { productId: 3, quantity: 1 },
          // Add more products as needed
        ];
        cy.wrap(products).each((product) => {
          cy.get(`tr[id="product-${product.productId}"}"]`).first().click();
          cy.go(-2);
        });
      });
  });
});
