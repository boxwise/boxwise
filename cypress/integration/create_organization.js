import uuidv4 from "uuid/v4";
import firebase from "firebase";

describe("Create organization flow", function() {
  it("creates an organization", function() {
    cy.visit("http://localhost:3000/signout");
    cy.visit("http://localhost:3000/create-organization");
    const organizationName = uuidv4();
    cy.get("input[name=name]").type(`${organizationName}{enter}`);
    cy.get("input[name=name]").type("Alice Test");
    cy.get("input[name=email]").type(`${organizationName}@example.com`);
    cy.get("input[name=password]").type("hunter2{enter}");
  });
});
