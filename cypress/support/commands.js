const { generateRandomUser } = require("../support/utils");
const { getUserFromLocalStorage } = require("../support/localStorage");

Cypress.Commands.add("homePageIsVisible", () => {
  cy.get("header").should("be.visible");
  cy.get("#slider").should("be.visible");
  cy.get(".container").should("be.visible");
});

Cypress.Commands.add("userSignUp", () => {
  cy.visit("https://www.automationexercise.com/");
  //check if home page is visible
  cy.get("header").should("be.visible");
  cy.get("#slider").should("be.visible");
  cy.get(".container").should("be.visible");
  ///check if signup/login button exist, then click on it
  cy.get("a[href= '/login']").should("exist").click();
  // Verify 'New User Signup!' is visible
  cy.contains("New User Signup!").should("be.visible");
  const newUser = generateRandomUser();
  cy.fillSignUpForm(newUser);
  cy.get('[data-qa="signup-button"]').click();
  const verifiedUser = cy.fillAccountInformation(newUser);
  cy.contains("Account Created!").should("be.visible");
  cy.window().then((win) => {
    win.localStorage.setItem("user", JSON.stringify(newUser));
  });
  cy.window().then((win) => {
    cy.log("=======saving to local sotorage=========");
    const storedUser = JSON.parse(win.localStorage.getItem("user"));
    expect(storedUser).to.deep.equal(newUser);
    cy.log(storedUser.email);
  });
});

Cypress.Commands.add("generateUSER", () => {
  const newUser = generateRandomUser();
  cy.request({
    method: "POST",
    url: "https://automationexercise.com/api/createAccount",
    failOnStatusCode: false,
    body: "newUser",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    const user = response.body;
    const { email, password } = response.body.user;
    expect(response.status).to.not.be.null;
  });
});
Cypress.Commands.add("fillSignUpForm", (user) => {
  cy.get('[data-qa="signup-name"]').type(user.name);
  cy.get('[data-qa="signup-email"]').type(user.email);
});
Cypress.Commands.add("fillLognInForm", (user) => {
  cy.get('[data-qa="login-email"]').type(user.email);
  cy.get('[data-qa="login-password"]').type(user.password);
});

Cypress.Commands.add("fillAccountInformation", (user) => {
  cy.get("#id_gender1").click();
  cy.get('input[data-qa="name"]').type(user.name);
  cy.get('input[data-qa="password"]').type(user.password);
  cy.get('input[data-qa="email"]').type("annydoe@gmail.com", { force: true });
  cy.get("#days").select("14").should("have.value", "14");
  cy.get('[data-qa="months"]').select("11").should("have.value", "11");
  cy.get('[data-qa="years"]').select("1994").should("have.value", "1994");
  cy.get('input[data-qa="first_name"]').type(user.firstname);
  cy.get('input[data-qa="last_name"]').type(user.lastname);
  cy.get('input[data-qa="company"]').type(user.company);
  cy.get('input[data-qa="address"]').type(user.address1);
  cy.get('input[data-qa="address2"]').type(user.address2);
  cy.get('[data-qa="country"]')
    .select("Australia")
    .should("have.value", "Australia");
  cy.get('input[data-qa="state"]').type(user.state);
  cy.get('input[data-qa="city"]').type(user.city);
  cy.get('input[data-qa="zipcode"]').type(user.zipcode);
  cy.get('input[data-qa="mobile_number"]').type(user.mobile_number);
  cy.get('[data-qa="create-account"]').click();
});

Cypress.Commands.add("deleteUser", (user) => {
  cy.request({
    method: "DELETE",
    url: "https://automationexercise.com/api/deleteAccount",
    body: user,
  }).then((response) => {
    cy.get("a[href='/delete_account']").click();
    cy.contains("Account Deleted").should("be.visible");
  });
});

// cypress/support/commands.js

Cypress.Commands.add("signInUSER", (storedUser) => {
  return getUserFromLocalStorage().then((userData) => {
    if (!userData.email || !userData.password) {
      throw new Error(
        "User email or password not found in local storage. Please register a user first."
      );
    }
    cy.request({
      method: "POST",
      url: "https://automationexercise.com/api/login",
      failOnStatusCode: false,
      body: {
        email: userData.email,
        password: userData.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.not.be.null;
    });
  });
});
Cypress.Commands.add("addProductsToCart", () => {
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
