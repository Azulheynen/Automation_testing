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

  it("user searchs for a product", () => {
    cy.get('a[href="/products"]').click();
    cy.contains("All Products").should("be.visible");
    cy.get('a[href="/products"]').click();
  });

  it("user can filter product by category" , ( ) => {
    cy.get('h2').contains('Category').should('be.visible')
    cy.get('a[href="#Women"]').click()
    cy.get('a[href="/category_products/1"]').click()
    cy.get('h2').should('contain', 'Women - Dress Products')
    cy.contains('Women - Dress Products')
    cy.get('a[href="#Men"]').click()
    cy.get('a[href="/category_products/6"]').click()
    cy.contains('Men - Jeans Products')

  })
  it("user can filter product by brand" , ( ) => {
    cy.get('h2').contains('Brand').should('be.visible')
    cy.get('a[href="/brand_products/H&M"]').click()
    cy.get('h2').should('contain','Brand - H&M Products')
    cy.get('a[href="/brand_products/Polo"]').click()
    cy.get('h2').should('contain','Brand - Polo Products')

  })

it.only("user can search for a product and add all related results to cart", () => {
 cy.get('a[href="/products"]').click()
 cy.get('h2').contains('All Products')
 cy.get('input#search_product').type('blue{enter}')
 cy.get('button#submit_search').click()
  cy.contains('Searched Products')
  ////
  cy.get(".product-image-wrapper").as("products");
  cy.get("@products")
    .its("length")
    .then((productList) => {
      cy.get("@products").find('p').contains(/blue|Blue/i)
      })

})

});
