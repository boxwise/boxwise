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

Cypress.Commands.add("getHost", () => { 
    let host = Cypress.env('host');
    return {host: host};
});

Cypress.Commands.add("getTestData", () => { 
    let testUser = Cypress.env('testUser');
    let testUserMail = Cypress.env('testUserMail');
    let testPwd = Cypress.env('testPwd');
    return {testUser: testUser, testUserMail: testUserMail, testPwd: testPwd};
});

Cypress.Commands.add("getChangePwdData", () => {
    let changePwdUserMail = Cypress.env('changePwdUserMail');
    let changePwdPwd = Cypress.env('changePwdPwd');
    let newPwd = Cypress.env('newPwd');
    return {changePwdUserMail: changePwdUserMail, changePwdPwd: changePwdPwd, newPwd: newPwd};
});

Cypress.Commands.add("reLogin", (userMail, userPassword) => {
    cy.visit(Cypress.env('host') + "/signout");
    cy.visit(Cypress.env('host') + "/signin");
    cy.get("div[data-cy=email] input").type(`${userMail}`);
    cy.get("div[data-cy=password] input").type(`${userPassword}`);
    cy.get("button[data-cy=signInButton]").click();
});

Cypress.Commands.add("openAppDrawer", () => { 
    cy.get("button[data-cy=appDrawerOpener]").click();
    cy.get("div[data-cy=appDrawerDiv]").should('be.visible');
});

Cypress.Commands.add("navigateToChangePasswordForm", () => {
    cy.openAppDrawer();
    cy.get("a[data-cy=changePasswordDrawerButton]").last().click();
});


Cypress.Commands.add("navigateToProductsPage", () => {
    cy.openAppDrawer();
    cy.get("a[data-cy=productsDrawerButton]").last().click();
});

Cypress.Commands.add("navigateToInvitePage", () => {
    cy.openAppDrawer();
    cy.get("a[data-cy=inviteDrawerButton]").last().click();
});

// 'Delete product' helper function
Cypress.Commands.add("createTestProduct", () => {
    let productName = uuidv4().substring(0,6);
    cy.get('button[data-cy=addProductButton]').click();
    cy.get('div[data-cy=selectCategory]').click();
    cy.get('li[id=category]').first().click();
    cy.get('div[data-cy=productName] input').type(`${productName}`);
    cy.get('button[data-cy=submitCreateProduct').click({ timeout: 10000 });
    cy.wait(2000);   //give table some time to update (without wait or doing this in click().then({}) doesn't find new row at all)
    cy.get('td[data-cy=productNameCell]').contains(`${productName}`).should('exist');  //cell with product name should be visible
});

//https://github.com/cypress-io/cypress/issues/761
Cypress.Commands.add("cleanUpXHR", function() {
    if (Cypress.env("run_all_suite")) {
      cy.visit(`${Cypress.env("yourAppUrl")}/404`, { failOnStatusCode: false });
    }
});