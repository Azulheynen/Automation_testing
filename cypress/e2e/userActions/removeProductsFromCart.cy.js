describe("remove products from cart", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com");
    cy.homePageIsVisible();
  });

  it("user can delete added products from cart", () => {
    cy.addProductsToCart();
    cy.get('a[href="/view_cart"]').first().click();
    cy.get("tbody").as("productsCart");
    cy.get("@productsCart")
      .its("length")
      .then((product) => {
        for( let i = 1 ;  i < 50 && i   ; i++ ) {
          if ([9, 10, 17,25,26,27,32, 34,36,46,].includes(i)) {
          continue
          }
else {
   const products = [
            { productId: i }
          ];
          cy.wrap(products).each((product) => {
            cy.get(`a[data-product-id="${product?.productId}"]`).first().click();
  
          });
}

cy.get('b').contains('Cart is empty!').should('be.visible')
        }
   
      });
  });
});
