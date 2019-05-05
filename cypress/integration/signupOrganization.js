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
        cy.get("div[data-cy=orgNameInput] input").type(`{enter}`).then(() => {
            cy.get("div[data-cy=orgNameInput]").should("be.visible");     //organization name input should be visible
        });
    });

    it('Password cannot be empty', () => {
        cy.get("div[data-cy=orgNameInput] input").type(`${testOrg}{enter}`);
        cy.get("div[data-cy=name] input").type(`${testUser}`);
        cy.get("div[data-cy=email] input").type(`${testUser}@example.com`);
        cy.get("button[data-cy=createUserButton").click().then(() => {
            cy.get("button[data-cy=createUserButton").should("be.visible");     //continue button should be visible
        });
    });

    it('Adds an organization confirmed by enter', function() {
        cy.get("div[data-cy=orgNameInput] input").type(`${testOrg}{enter}`);
        cy.get("div[data-cy=name] input").type(`${testUser}`);
        cy.get("div[data-cy=email] input").type(`${testUser}@example.com`);
        cy.get("div[data-cy=password] input").type(`${testPwd}{enter}`).then(()=>{
            cy.get("button[data-cy=createUserButton]").should("not.exist");
            cy.get("button[data-cy=copyToClipboardButton]").should("be.visible");
        });
    });

    it('Adds an organization confirmed by submit button', function() {
        cy.get("div[data-cy=orgNameInput] input").type(`${testOrg}_2{enter}`);
        cy.get("div[data-cy=name] input").type(`${testUser}_2`);
        cy.get("div[data-cy=email] input").type(`${testUser}_2@example.com`);    //can't use the same mail as the previous test
        cy.get("div[data-cy=password] input").type(`${testPwd}_2`);
        cy.get("button[data-cy=createUserButton]").click().then(() => {
            cy.get("button[data-cy=createUserButton]").should("not.exist");
            cy.get("button[data-cy=copyToClipboardButton]").should("be.visible");
        });
    });
});