import { getTestConfig } from "../config";

describe("Control operations", () => {
  const { testUserMail, testPwd } = getTestConfig();

  it("Login -> logout", () => {
    cy.visit("/signout");
    cy.get("div[data-testid=email] input").type(`${testUserMail}`);
    cy.get("div[data-testid=password] input").type(`${testPwd}`);
    cy.get("button[data-testid=signInButton]").click({ timeout: 10000 });
    cy.get("button[data-testid=makeBoxButton]").should("exist");
    cy.get("a[data-testid=findBoxesButton]").should("exist");
    cy.get("button[data-testid=appDrawerOpener]").should("exist");
    cy.openAppDrawer();
    cy.get("a[data-testid=signoutDrawerButton]")
      .last()
      .click();
    cy.get("button[data-testid=signInButton]").should("exist"); // existing sign-in button means user is logged out
  });

  it("Change password -> Relogin -> Change password", () => {
    cy.reLogin(testUserMail, testPwd);
    cy.navigateToChangePasswordForm();
    cy.get("div[data-testid=currentPassword] input").type(`${testPwd}`);
    cy.get("div[data-testid=newPassword] input").type(`${testPwd}`);
    cy.get("div[data-testid=confirmedPassword] input").type(`${testPwd}`);
    cy.get("button[type=submit]").click({ timeout: 10000 });
    cy.get("p[data-testid=pwdChangeConfirmation").should("be.visible");
    // now change the password again to see it works and to ensure configured password is still valid
    cy.reLogin(testUserMail, testPwd);
    cy.openAppDrawer();
    cy.get("a[data-testid=changePasswordDrawerButton]")
      .last()
      .click();
    cy.get("div[data-testid=currentPassword] input").type(`${testPwd}`);
    cy.get("div[data-testid=newPassword] input").type(`${testPwd}`);
    cy.get("div[data-testid=confirmedPassword] input").type(`${testPwd}`);
    cy.get("button[type=submit]").click({ timeout: 10000 });
    cy.get("p[data-testid=pwdChangeConfirmation").should("be.visible");
  });

  it("Change password form cannot have any empty field", () => {
    cy.reLogin(testUserMail, testPwd);
    cy.navigateToChangePasswordForm();
    // confirmedPassword empty
    cy.get("div[data-testid=currentPassword] input").type(`${testPwd}`);
    cy.get("div[data-testid=newPassword] input").type(`${testPwd}`);
    cy.get("button[type=submit]").click();
    cy.get("p[data-testid=pwdChangeConfirmation").should("not.be.visible");
    // newPassword empty
    cy.get("div[data-testid=confirmedPassword] input").type(`${testPwd}`);
    cy.get("div[data-testid=newPassword] input").clear();
    cy.get("button[type=submit]").click();
    cy.get("p[data-testid=pwdChangeConfirmation").should("not.be.visible");
    // currentPassword empty
    cy.get("div[data-testid=newPassword] input").type(`${testPwd}`);
    cy.get("div[data-testid=currentPassword] input").clear();
    cy.get("button[type=submit]").click();
    cy.get("p[data-testid=pwdChangeConfirmation").should("not.be.visible");
  });

  it("Invite", () => {
    cy.reLogin(testUserMail, testPwd);
    cy.navigateToInvitePage();
    cy.get("button[data-testid=copyToClipboardButton]").should("be.visible");
    // cypress opens an alert to confirm copying to clipboard - not sure what to do here (how to confirm it automatically)
    // const stub = cy.stub();
    // cy.on('window:alert', stub);
    // how to access text buffer? - https://github.com/cypress-io/cypress/issues/2386
  });
});
