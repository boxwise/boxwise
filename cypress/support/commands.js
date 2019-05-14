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

Cypress.Commands.add("getByTestId", testId =>
  cy.get(`[data-testid=${testId}]`)
);
Cypress.Commands.add("getInputContainedByTestId", testId =>
  cy.get(`[data-testid=${testId}] input`)
);
Cypress.Commands.add("getTextAreaContainedByTestId", testId =>
  cy.get(`[data-testid=${testId}] textarea`)
);

Cypress.Commands.add("reLogin", (userMail, userPassword) => {
  cy.visit("/signout");
  cy.getInputContainedByTestId("email").type(`${userMail}`);
  cy.getInputContainedByTestId("password").type(`${userPassword}`);
  cy.getByTestId("signInButton").click();
  cy.location("pathname", { timeout: 10000 }).should("not.include", "/signin");
});

Cypress.Commands.add("openAppDrawer", () => {
  cy.getByTestId("appDrawerOpener").should("be.visible");
  cy.get("body").then($body => {
    if ($body.find("[data-testid=appDrawerOpener]").length > 0) {
      cy.getByTestId("appDrawerOpener")
        .click()
        .then(() => {
          cy.getByTestId("appDrawerDiv")
            .last()
            .should("be.visible");
        });
    } else {
      cy.getByTestId("appDrawerDiv")
        .last()
        .should("be.visible");
    }
  });
});

Cypress.Commands.add("navigateToChangePasswordForm", () => {
  cy.openAppDrawer();
  cy.getByTestId("changePasswordDrawerButton")
    .last()
    .click();
});

Cypress.Commands.add("navigateToProductsPage", () => {
  cy.openAppDrawer();
  cy.getByTestId("productsDrawerButton")
    .last()
    .click();
});

Cypress.Commands.add("navigateToInvitePage", () => {
  cy.openAppDrawer();
  cy.getByTestId("inviteDrawerButton")
    .last()
    .click();
});

// 'Delete product' helper function
Cypress.Commands.add("createTestProduct", () => {
  const productName = uuidv4().substring(0, 6);
  cy.getByTestId("addProductButton").click();
  cy.getByTestId("selectCategory").click();
  cy.get("li[id=category]")
    .first()
    .click();
  cy.getInputContainedByTestId("productName").type(`${productName}`);
  cy.getByTestId("submitCreateProduct").click({ timeout: 10000 });
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(2000); // give table some time to update (without wait or doing this in click().then({}) doesn't find new row at all)
  cy.getByTestId("productNameCell")
    .contains(`${productName}`)
    .should("exist"); // cell with product name should be visible
});

// https://github.com/cypress-io/cypress/issues/761
Cypress.Commands.add("cleanUpXHR", () => {
  if (Cypress.env("run_all_suite")) {
    cy.visit("/404", { failOnStatusCode: false });
  }
});
