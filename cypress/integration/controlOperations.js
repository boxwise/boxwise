import { getTestConfig } from "../config";

describe("Control operations", () => {
  const { testUserMail, testPwd } = getTestConfig();

  it("Login -> logout", () => {
    cy.visit("/signout");
    cy.getInputContainedByTestId("email").type(`${testUserMail}`);
    cy.getInputContainedByTestId("password").type(`${testPwd}`);
    cy.getByTestId("signInButton").click({ timeout: 10000 });
    cy.getByTestId("makeBoxButton").should("exist");
    cy.getByTestId("findBoxesButton").should("exist");
    cy.getByTestId("appDrawerOpener").should("exist");
    cy.openAppDrawer();
    cy.getByTestId("signoutDrawerButton")
      .last()
      .click();
    cy.getByTestId("signInButton").should("exist"); // existing sign-in button means user is logged out
  });

  it("Change password -> Relogin -> Change password", () => {
    cy.reLogin(testUserMail, testPwd);
    cy.navigateToChangePasswordForm();
    cy.getInputContainedByTestId("currentPassword").type(`${testPwd}`);
    cy.getInputContainedByTestId("newPassword").type(`${testPwd}`);
    cy.getInputContainedByTestId("confirmedPassword").type(`${testPwd}`);
    cy.get("button[type=submit]").click({ timeout: 10000 });
    cy.getByTestId("pwdChangeConfirmation").should("be.visible");
    // now change the password again to see it works and to ensure configured password is still valid
    cy.reLogin(testUserMail, testPwd);
    cy.openAppDrawer();
    cy.getByTestId("changePasswordDrawerButton")
      .last()
      .click();
    cy.getInputContainedByTestId("currentPassword").type(`${testPwd}`);
    cy.getInputContainedByTestId("newPassword").type(`${testPwd}`);
    cy.getInputContainedByTestId("confirmedPassword").type(`${testPwd}`);
    cy.get("button[type=submit]").click({ timeout: 10000 });
    cy.getByTestId("pwdChangeConfirmation").should("be.visible");
  });

  it("Change password form cannot have any empty field", () => {
    cy.reLogin(testUserMail, testPwd);
    cy.navigateToChangePasswordForm();
    // confirmedPassword empty
    cy.getInputContainedByTestId("currentPassword").type(`${testPwd}`);
    cy.getInputContainedByTestId("newPassword").type(`${testPwd}`);
    cy.get("button[type=submit]").click();
    cy.getByTestId("pwdChangeConfirmation").should("not.be.visible");
    // newPassword empty
    cy.getInputContainedByTestId("confirmedPassword").type(`${testPwd}`);
    cy.getInputContainedByTestId("newPassword").clear();
    cy.get("button[type=submit]").click();
    cy.getByTestId("pwdChangeConfirmation").should("not.be.visible");
    // currentPassword empty
    cy.getInputContainedByTestId("newPassword").type(`${testPwd}`);
    cy.getInputContainedByTestId("currentPassword").clear();
    cy.get("button[type=submit]").click();
    cy.getByTestId("pwdChangeConfirmation").should("not.be.visible");
  });

  it("Invite", () => {
    cy.reLogin(testUserMail, testPwd);
    cy.navigateToInvitePage();
    cy.getByTestId("copyToClipboardButton").should("be.visible");
    // cypress opens an alert to confirm copying to clipboard - not sure what to do here (how to confirm it automatically)
    // const stub = cy.stub();
    // cy.on('window:alert', stub);
    // how to access text buffer? - https://github.com/cypress-io/cypress/issues/2386
  });
});
