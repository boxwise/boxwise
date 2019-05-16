import uuidv4 from "uuid/v4";

import { getTestConfig } from "../config";

describe("CRUD boxes tests", () => {
  const { testUserMail, testPwd } = getTestConfig();

  beforeEach(() => {
    cy.reLogin(testUserMail, testPwd);
  });

  it("Create new box", () => {
    const testCount = Math.floor(Math.random() * 6) + 1;
    const testComment = uuidv4().substring(0, 6);
    cy.getByTestId("makeBoxButton").click();
    cy.getByTestId("boxForm").should("exist"); // form to add box should pop up
    cy.getByTestId("selectProduct").selectNth(1);
    cy.getByTestId("quantity").type(`${testCount}`);
    cy.getByTestId("comment").type(`${testComment}`);
    cy.getByTestId("submitCreateBox").click({ timeout: 10000 });
    cy.getByTestId("boxCreatedLabel").should("exist"); // "Box created" label with box details should be visible
  });

  it("Create 2 boxes in a row updates overview of last added box", () => {
    const testCount = Math.floor(Math.random() * 6) + 1;
    const testComment = uuidv4().substring(0, 6);
    cy.getByTestId("makeBoxButton").click();
    cy.getByTestId("boxForm").should("exist"); // form to add box should pop up

    cy.getByTestId("selectProduct").selectNth(1);
    cy.getByTestId("quantity").type(`${testCount}`);
    cy.getByTestId("comment").type(`${testComment}`);
    cy.getByTestId("submitCreateBox").click({ timeout: 10000 });

    cy.getByTestId("boxCreatedLabel").should("exist"); // "Box created" label with box details should be visible
    cy.getByTestId("boxCreatedQuantityLabel").should(
      "contain",
      `${testCount}x`
    ); // count of items should be displayed
    cy.getByTestId("createAnotherBoxButton").click();

    cy.getByTestId("boxForm").should("exist"); // form to add box should pop up
    cy.getByTestId("selectProduct").selectNth(1);
    cy.getByTestId("quantity").type(`${testCount + 1}`);
    cy.getByTestId("comment").type(`${testComment}`);
    cy.getByTestId("submitCreateBox").click({ timeout: 10000 });

    cy.getByTestId("boxCreatedLabel").should("exist"); // "Box created" label with box details should be visible
    cy.getByTestId("boxCreatedQuantityLabel").should(
      "contain",
      `${testCount + 1}x`
    ); // updated count of items should be displayed
  });

  it("Number of items during box creation has to be specified", () => {
    const testComment = uuidv4().substring(0, 6);
    cy.getByTestId("makeBoxButton").should("be.visible");
    cy.getByTestId("makeBoxButton").click();
    cy.getByTestId("boxForm").should("exist"); // form to add box should pop up

    cy.getByTestId("selectProduct").selectNth(1);
    cy.getByTestId("comment").type(`${testComment}`);
    cy.getByTestId("submitCreateBox").click({ timeout: 10000 });
    cy.getByTestId("quantity").should("exist"); // number of items input should be visible
  });
});
