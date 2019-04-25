import uuidv4 from "uuid/v4";

describe('Add Organization', function() {
    let testOrg;
    let testUser;
    let testUserMail;
    let testPwd;

    before(function() {
        cy.getTestData().then(($result) => {
            testOrg= $result.testOrg;
            testUser= $result.testUser;
            testUserMail= $result.testUserMail;
            testPwd= $result.testPwd;
        });
      });    
    
    beforeEach(function() {
        cy.visit("http://localhost:3000/signout");
        cy.visit('http://localhost:3000/create-organization')
    })

    it('Organization name cannot be empty', () => {
        cy.get("input[name=name]").type(`{enter}`).then(() => {
            cy.get("div[data-cy=orgNameInput").should("be.visible");
        });
    });

    it('Password cannot be empty', () => {
        const organizationName = uuidv4();
        cy.get("input[name=name]").type(`${testOrg}{enter}`);
        cy.get("input[name=name]").type(`${testUser}`);
        cy.get("input[name=email]").type(`${testUserMail}`);
        cy.get("button[type=submit]").click().then(() => {
            cy.get("button[type=submit]").should("exist");
            cy.get("img[alt=progress]").should("not.be.visible");
        });
    });
    
    it('Adds an organization', function() {
        const organizationName = uuidv4();
        cy.get("input[name=name]").type(`${testOrg}{enter}`);
        cy.get("input[name=name]").type(`${testUser}`);
        cy.get("input[name=email]").type(`${testUserMail}`);
        cy.get("input[name=password]").type(`${testPwd}`);
        cy.get("button[type=submit]").click().then(() => {
            cy.get("button[type=submit]").should("not.exist");
            cy.get("img[alt=progress]").should("be.visible");
        });
    });
    
    it('Adds an organization confirmed by enter', function() {
        const organizationName = uuidv4();
        cy.get("input[name=name]").type(`${testOrg}{enter}`);
        cy.get("input[name=name]").type(`${testUser}`);
        cy.get("input[name=email]").type(`${testUserMail}`);
        cy.get("input[name=password]").type(`${testPwd}{enter}`).then(() => {
            //cy.get("button[type=submit]").should("not.exist");
            //cy.get("img[alt=progress]").should("be.visible");
        });
        cy.get("button[type=submit]").should("not.exist");
        cy.get("img[alt=progress]").should("be.visible");
    });
    
    it('Adds an organization and waits for navigation', function() {
        const organizationName = uuidv4();
        cy.get("input[name=name]").type(`${testOrg}{enter}`);
        cy.get("input[name=name]").type(`${testUser}`);
        cy.get("input[name=email]").type(`${testUserMail}`);
        cy.get("input[name=password]").type(`${testPwd}`);
        cy.get("button[type=submit]").click();
        cy.location('pathname', {timeout: 60000}).should('not.include', '/create-organization');
    });
    
})