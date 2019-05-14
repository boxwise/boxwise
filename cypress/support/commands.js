import uuidv4 from "uuid/v4";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("reLogin", (userMail, userPassword) => {
  cy.visit("/signout");
  cy.get("[data-testid=email] input").type(`${userMail}`);
  cy.get("[data-testid=password] input").type(`${userPassword}`);
  cy.get("[data-testid=signInButton]").click();
  cy.location("pathname", { timeout: 10000 }).should("not.include", "/signin");
});

Cypress.Commands.add("openAppDrawer", () => {
  cy.get("[data-testid=appDrawerOpener]").should("be.visible");
  cy.get("body").then($body => {
    if ($body.find("[data-testid=appDrawerOpener]").length > 0) {
      cy.get("[data-testid=appDrawerOpener]")
        .click()
        .then(() => {
          cy.get("[data-testid=appDrawerDiv]")
            .last()
            .should("be.visible");
        });
    } else {
      cy.get("[data-testid=appDrawerDiv]")
        .last()
        .should("be.visible");
    }
  });
});

Cypress.Commands.add("navigateToChangePasswordForm", () => {
  cy.openAppDrawer();
  cy.get("[data-testid=changePasswordDrawerButton]")
    .last()
    .click();
});

Cypress.Commands.add("navigateToProductsPage", () => {
  cy.openAppDrawer();
  cy.get("[data-testid=productsDrawerButton]")
    .last()
    .click();
});

Cypress.Commands.add("navigateToInvitePage", () => {
  cy.openAppDrawer();
  cy.get("[data-testid=inviteDrawerButton]")
    .last()
    .click();
});

// 'Delete product' helper function
Cypress.Commands.add("createTestProduct", () => {
  const productName = uuidv4().substring(0, 6);
  cy.get("[data-testid=addProductButton]").click();
  cy.get("[data-testid=selectCategory]").click();
  cy.get("li[id=category]")
    .first()
    .click();
  cy.get("[data-testid=productName] input").type(`${productName}`);
  cy.get("[data-testid=submitCreateProduct").click({ timeout: 10000 });
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(2000); // give table some time to update (without wait or doing this in click().then({}) doesn't find new row at all)
  cy.get("[data-testid=productNameCell]")
    .contains(`${productName}`)
    .should("exist"); // cell with product name should be visible
});

// https://github.com/cypress-io/cypress/issues/761
Cypress.Commands.add("cleanUpXHR", () => {
  if (Cypress.env("run_all_suite")) {
    cy.visit("/404", { failOnStatusCode: false });
  }
});
