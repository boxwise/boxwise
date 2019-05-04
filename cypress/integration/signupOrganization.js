import uuidv4 from "uuid/v4";

describe('Add Organization', function() {
    let testOrg;
    let testUser;
    let testPwd;

    beforeEach(function() {
        cy.visit("http://localhost:3000/signout");
        cy.visit('http://localhost:3000/create-organization')
        //data need to be recreated before each test to ensure their valid and not in the DB yet
        testOrg = uuidv4();
        let substr = testOrg.substring(0,6);
        testUser = substr;
        testPwd = substr;
    });

    it('Organization name cannot be empty', () => {
        cy.get("input[name=name]").type(`{enter}`).then(() => {
            cy.get("div[data-cy=orgNameInput").should("be.visible");     //organization name input should be visible
        });
    });

    /*it('Password cannot be empty', () => {
        cy.get("input[name=name]").type(`${testOrg}{enter}`);
        cy.get("input[name=name]").type(`${testUser}`);
        cy.get("input[name=email]").type(`${testUser}@example.com`);
        cy.get("button[type=submit]").click().then(() => {
            cy.get("button[data-cy=createUserButton").should("be.visible");     //continue button should be visible
        });
    });

    it('Adds an organization confirmed by enter', function() {
        cy.get("input[name=name]").type(`${testOrg}{enter}`);
        cy.get("input[name=name]").type(`${testUser}`);
        cy.get("input[name=email]").type(`${testUser}@example.com`);
        cy.get("input[name=password]").type(`${testPwd}{enter}`);
        cy.get("button[data-cy=copyToClipboardButton]").should("exist");
    });

    it('Adds an organization confirmed by submit button', function() {
        cy.get("input[name=name]").type(`${testOrg}_2{enter}`);
        cy.get("input[name=name]").type(`${testUser}_2`);
        cy.get("input[name=email]").type(`${testUser}_2@example.com`);    //can't use the same mail as the previous test
        cy.get("input[name=password]").type(`${testPwd}_2`);
        cy.get("button[type=submit]").click({timeout:10000}).then(() => {
            // TO DECIDE: what should be tested here? What is expected outome/page?
            //cy.get("div[data-cy=signedInAsLabel]").should("exist");
            cy.get("button[data-cy=copyToClipboardButton]").should("exist");
        });
    });*/
});