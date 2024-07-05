describe("remove products from cart", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com");
    cy.homePageIsVisible();
  });

  it("user can delete added products from cart", () => {
    cy.addProductsToCart();
    cy.get('a[href="/view_cart"]').first().click();
    cy.get("tbody tr").each(($row) => {

      cy.wrap($row)
      .find("a[data-product-id]")
      .invoke('attr', 'data-product-id')
      .then((productId) => {
          cy.get(`a[data-product-id="${productId}"]`).click();
      })
    })
    cy.get('b').contains('Cart is empty!').should('be.visible');



  });
});
