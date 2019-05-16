import uuidv4 from "uuid/v4";

import { getTestConfig } from "../config";

describe("CRUD products tests", () => {
  const { testUserMail, testPwd } = getTestConfig();

  beforeEach(() => {
    cy.reLogin(testUserMail, testPwd);
  });

  // To keep the balance, I create 2 products because 2 products are deleted in following tests
  it("Create 2 new products", () => {
    cy.navigateToProductsPage();
    cy.createTestProduct();
    cy.createTestProduct();
  });

  // We're expecting this test to fail once pagination of tables gets implemented
  it("'Delete product' removes one row from table", () => {
    cy.navigateToProductsPage();
    cy.getByTestId("productsTableBody")
      .find("tr")
      .its("length")
      .then(rowsBefore => {
        cy.getByTestId("deleteProductButton")
          .first()
          .click();
        cy.getByTestId("deleteConfirmationDialog").should("be.visible");
        cy.getByTestId("confirmDeleteButton").click();
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000); // updating table takes some time
        cy.getByTestId("productsTableBody")
          .find("tr")
          .its("length")
          .as("rowsAfter");
        cy.get("@rowsAfter").should("equal", rowsBefore - 1); // there should be one less row
      });
  });

  it("'Delete product' lowers count of products with same name by 1", () => {
    cy.navigateToProductsPage();
    cy.getByTestId("productNameCell")
      .first()
      .invoke("text")
      .as("firstProductName")
      .then(firstProductName => {
        cy.get(`td:contains(${firstProductName})`)
          .its("length")
          .as("sameNameCountBefore")
          .then(sameNameCountBefore => {
            cy.getByTestId("deleteProductButton")
              .first()
              .click();
            cy.getByTestId("deleteConfirmationDialog").should("be.visible");
            cy.getByTestId("confirmDeleteButton").click();
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(2000); // updating table takes some time
            if (sameNameCountBefore === 1) {
              cy.get(`td:contains(${firstProductName})`).should("not.exist"); // if there was only such product name, now it shouldn't exist at all
            } else {
              cy.get(`td:contains(${firstProductName})`)
                .its("length")
                .as("sameNameCountAfter");
              cy.get("@sameNameCountAfter").should(
                "equal",
                sameNameCountBefore - 1
              ); // if there were more products with this name, now it should be lower by one
            }
          });
      });
  });

  it("Edit product", () => {
    const newName = uuidv4().substring(0, 6);
    cy.navigateToProductsPage();
    cy.getByTestId("editProductButton")
      .first()
      .click();
    cy.getByTestId("productDialog").should("be.visible");
    cy.getByTestId("productName")
      .clear()
      .type(newName);
    cy.getByTestId("submitCreateProduct").click();
    cy.getByTestId("productNameCell")
      .first()
      .invoke("text")
      .should("equal", newName);
  });
});
