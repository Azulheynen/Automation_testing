const { generateRandomUser } = require("../../support/utils");

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

  it("user can filter product by category", () => {
    cy.get("h2").contains("Category").should("be.visible");
    cy.get('a[href="#Women"]').click();
    cy.get('a[href="/category_products/1"]').click();
    cy.get("h2").should("contain", "Women - Dress Products");
    cy.contains("Women - Dress Products");
    cy.get('a[href="#Men"]').click();
    cy.get('a[href="/category_products/6"]').click();
    cy.contains("Men - Jeans Products");
  });
  it("user can filter product by brand", () => {
    cy.get("h2").contains("Brand").should("be.visible");
    cy.get('a[href="/brand_products/H&M"]').click();
    cy.get("h2").should("contain", "Brand - H&M Products");
    cy.get('a[href="/brand_products/Polo"]').click();
    cy.get("h2").should("contain", "Brand - Polo Products");
  });

  it("user can search for a product and add all related results to cart", () => {
    cy.get('a[href="/products"]').click();
    cy.get("h2").contains("All Products");
    cy.get("input#search_product").type("blue{enter}");
    cy.get("button#submit_search").click();
    cy.contains("Searched Products");
    cy.get(".product-image-wrapper").as("products");
    cy.get("@products")
      .its("length")
      .then((productList) => {
        const productByCategory = cy
          .get("@products")
          .find("p")
          .contains(/blue|Blue/i);

        if (productByCategory) {
          cy.get("@products")
            .its("length")
            .then((productCount) => {
              cy.get("@products").each(($product, index) => {
                cy.wrap($product)
                  .find(".single-products")
                  .trigger("mouseover", { force: true });

                cy.wrap($product)
                  .find("a[data-product-id]")
                  .then(($button) => {
                    $button[0].click();
                  });

                cy.get("div.modal-content").within(() => {
                  if (index === productCount - 1) {
                    cy.contains("View Cart").click();
                  } else {
                    cy.contains("Continue Shopping").click({ force: true });
                  }
                });
              });
            });
          cy.get("a.check_out").click();
          cy.get('a[href="/login"]').contains("Register / Login").click();
          cy.contains("New User Signup!").should("be.visible");
          const newUser = generateRandomUser();
          cy.fillSignUpForm(newUser);
          cy.get('[data-qa="signup-button"]').click();
          const verifiedUser = cy.fillAccountInformation(newUser);
          cy.contains("Account Created!").should("be.visible");

          cy.get('a[data-qa="continue-button"]').click();
          cy.get('a[href="/view_cart"]').contains("Cart").as("cartButton");
          cy.get("@cartButton").click({ force: true });
          cy.contains(/Blue | blue /i);
        }
      });
  });

  it("user can add a review", () => {
    cy.get(".features_items").should("be.visible");
    cy.get('a[href="/products"]').click();
    cy.get('a[href="/product_details/1"]').click();
    cy.get("#review-form").should("be.visible");
    cy.get("input#name").type("username");
    cy.get("input#email").type("usermail@gmail.com");
    cy.get("textarea#review").type(
      "I have purchased school clothing since my little one had started school. This was my 3rd lot of uniform and everything has always been really good quality, never had any issues or problems. Sometimes I order on line or take a chance and just pop in to see if I can get everything I need straight away, which actually I did last time, only had to have 1 item with the logo on to be made up and that was all done by the afternoon on the same day!"
    );
    cy.get("#button-review").click();
  });
  it("user adds to cart recomemded items", () => {
    cy.get(".recommended_items").scrollIntoView().as("recommendedProducts");
    cy.get("@recommendedProducts")
      .find(".product-image-wrapper")
      .then(($product) => {
        cy.get($product).each(($item, index) => {
          cy.get($item)
            .find("a[data-product-id]")
            .then(($button) => {
              $button[0].click();
            });
          if (index === -1) {
            cy.contains("View Cart").click();
          } 
          else {
            cy.contains("Continue Shopping").click({});
          }
        });
        cy.get("a[href='/view_cart']").first().click()
        cy.get('tr').should('be.visible')
      });
  });

  
});
