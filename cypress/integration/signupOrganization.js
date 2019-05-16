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
    cy.getByTestId("orgNameInput").type(`{enter}`);
    cy.getByTestId("orgNameInput").should("be.visible"); // organization name input should be visible
  });

  it("Password cannot be empty", () => {
    cy.getByTestId("orgNameInput").type(`${testOrg}{enter}`);
    cy.getByTestId("name").type(`${testUser}`);
    cy.getByTestId("email").type(`${testUser}@example.com`);
    cy.getByTestId("createUserButton").click();
    cy.getByTestId("createUserButton").should("be.visible"); // continue button should be visible
  });

  it("Adds an organization confirmed by enter", () => {
    cy.getByTestId("orgNameInput").type(`${testOrg}{enter}`);
    cy.getByTestId("name").type(`${testUser}`);
    cy.getByTestId("email").type(`${testUser}@example.com`);
    cy.getByTestId("password").type(`${testPwd}{enter}`);
    cy.getByTestId("createUserButton").should("not.exist");
    cy.getByTestId("copyToClipboardButton").should("be.visible");
  });

  it("Adds an organization confirmed by submit button", () => {
    cy.getByTestId("orgNameInput").type(`${testOrg}_2{enter}`);
    cy.getByTestId("name").type(`${testUser}_2`);
    cy.getByTestId("email").type(`${testUser}_2@example.com`); // can't use the same mail as the previous test
    cy.getByTestId("password").type(`${testPwd}_2`);
    cy.getByTestId("createUserButton").click();
    cy.getByTestId("createUserButton").should("not.exist");
    cy.getByTestId("copyToClipboardButton").should("be.visible");
  });
});
