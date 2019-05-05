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
    cy.visit("http://localhost:3000/signout");
    cy.visit("http://localhost:3000/signin");
    cy.get("input[name=email]").type(`${userMail}`);
    cy.get("input[name=password]").type(`${userPassword}`);
    cy.get("button[type=submit]").click();
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
Cypress.Commands.add("getDuplicateProductsCount", (productName) => {
    cy.get('td[data-cy=productNameCell]').then(($nameCells) => {
        let productsWithSameName = Cypress.$.grep($nameCells, function( n, i ) {return ( n.innerText == productName );});
        return productsWithSameName.length;
    });
});

//https://github.com/cypress-io/cypress/issues/761
Cypress.Commands.add("cleanUpXHR", function() {
    if (Cypress.env("run_all_suite")) {
      cy.visit(`${Cypress.env("yourAppUrl")}/404`, { failOnStatusCode: false });
    }
});