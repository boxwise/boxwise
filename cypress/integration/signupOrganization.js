import uuidv4 from "uuid/v4";

describe("Add Organization", () => {
  let testOrg;
  let testUser;
  let testPwd;

  beforeEach(() => {
    cy.visit("/signout");
    cy.visit("/create-organization");
    // data need to be recreated before each test to ensure their valid and not in the DB yet
    testOrg = uuidv4();
    const substr = testOrg.substring(0, 6);
    testUser = substr;
    testPwd = substr;
  });

  it("Organization name cannot be empty", () => {
    cy.get("[data-testid=orgNameInput] input")
      .type(`{enter}`)
      .then(() => {
        cy.get("[data-testid=orgNameInput]").should("be.visible"); // organization name input should be visible
      });
  });

  it("Password cannot be empty", () => {
    cy.get("[data-testid=orgNameInput] input").type(`${testOrg}{enter}`);
    cy.get("[data-testid=name] input").type(`${testUser}`);
    cy.get("[data-testid=email] input").type(`${testUser}@example.com`);
    cy.get("[data-testid=createUserButton")
      .click()
      .then(() => {
        cy.get("[data-testid=createUserButton").should("be.visible"); // continue button should be visible
      });
  });

  it("Adds an organization confirmed by enter", () => {
    cy.get("[data-testid=orgNameInput] input").type(`${testOrg}{enter}`);
    cy.get("[data-testid=name] input").type(`${testUser}`);
    cy.get("[data-testid=email] input").type(`${testUser}@example.com`);
    cy.get("[data-testid=password] input")
      .type(`${testPwd}{enter}`)
      .then(() => {
        cy.get("[data-testid=createUserButton]").should("not.exist");
        cy.get("[data-testid=copyToClipboardButton]").should("be.visible");
      });
  });

  it("Adds an organization confirmed by submit button", () => {
    cy.get("[data-testid=orgNameInput] input").type(`${testOrg}_2{enter}`);
    cy.get("[data-testid=name] input").type(`${testUser}_2`);
    cy.get("[data-testid=email] input").type(`${testUser}_2@example.com`); // can't use the same mail as the previous test
    cy.get("[data-testid=password] input").type(`${testPwd}_2`);
    cy.get("[data-testid=createUserButton]")
      .click()
      .then(() => {
        cy.get("[data-testid=createUserButton]").should("not.exist");
        cy.get("[data-testid=copyToClipboardButton]").should("be.visible");
      });
  });
});
