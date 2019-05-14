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
    cy.getInputContainedByTestId("orgNameInput")
      .type(`{enter}`)
      .then(() => {
        cy.getByTestId("orgNameInput").should("be.visible"); // organization name input should be visible
      });
  });

  it("Password cannot be empty", () => {
    cy.getInputContainedByTestId("orgNameInput").type(`${testOrg}{enter}`);
    cy.getInputContainedByTestId("name").type(`${testUser}`);
    cy.getInputContainedByTestId("email").type(`${testUser}@example.com`);
    cy.getByTestId("createUserButton")
      .click()
      .then(() => {
        cy.getByTestId("createUserButton").should("be.visible"); // continue button should be visible
      });
  });

  it("Adds an organization confirmed by enter", () => {
    cy.getInputContainedByTestId("orgNameInput").type(`${testOrg}{enter}`);
    cy.getInputContainedByTestId("name").type(`${testUser}`);
    cy.getInputContainedByTestId("email").type(`${testUser}@example.com`);
    cy.getInputContainedByTestId("password")
      .type(`${testPwd}{enter}`)
      .then(() => {
        cy.getByTestId("createUserButton").should("not.exist");
        cy.getByTestId("copyToClipboardButton").should("be.visible");
      });
  });

  it("Adds an organization confirmed by submit button", () => {
    cy.getInputContainedByTestId("orgNameInput").type(`${testOrg}_2{enter}`);
    cy.getInputContainedByTestId("name").type(`${testUser}_2`);
    cy.getInputContainedByTestId("email").type(`${testUser}_2@example.com`); // can't use the same mail as the previous test
    cy.getInputContainedByTestId("password").type(`${testPwd}_2`);
    cy.getByTestId("createUserButton")
      .click()
      .then(() => {
        cy.getByTestId("createUserButton").should("not.exist");
        cy.getByTestId("copyToClipboardButton").should("be.visible");
      });
  });
});
