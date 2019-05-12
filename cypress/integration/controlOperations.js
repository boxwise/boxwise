import uuidv4 from "uuid/v4";

describe('Control operations', function() {
    let host;
    let testUserMail;
    let testPwd;
    let changePwdUserMail;
    let changePwdPwd;
    let newPwd;

    before(function() {
        cy.getTestData().then(($result) => {
            testUserMail= $result.testUserMail;
            testPwd= $result.testPwd;
        });
        cy.getChangePwdData().then(($result) => {
            changePwdUserMail= $result.changePwdUserMail;
            changePwdPwd= $result.changePwdPwd;
            newPwd = $result.newPwd;
        });
        cy.getHost().then(($result) => {
            host= $result.host;
        });
      });   

    it('Login -> logout', () => {
        cy.visit(host + "/signout");
        cy.visit(host + "/signin");
        cy.get("div[data-cy=email] input").type(`${testUserMail}`);
        cy.get("div[data-cy=password] input").type(`${testPwd}`);
        cy.get("button[data-cy=signInButton]").click({ timeout: 10000}).then(() => {
            cy.get("button[data-cy=makeBoxButton]").should('exist');
            cy.get("a[data-cy=findBoxesButton]").should('exist');
            cy.get("button[data-cy=appDrawerOpener]").should('exist');
            cy.openAppDrawer();         
            cy.get("div[data-cy=signoutDrawerButton]").last().click(); 
            cy.get("a[data-cy=loginLink]").should('exist');   //existing login link means user is logged out
        });
    });

    it('Change password -> Relogin -> Change password', () => {
        cy.reLogin(changePwdUserMail, changePwdPwd);        
        cy.navigateToChangePasswordForm();
        cy.get("div[data-cy=currentPassword] input").type(`${changePwdPwd}`);
        cy.get("div[data-cy=newPassword] input").type(`${newPwd}`);
        cy.get("div[data-cy=confirmedPassword] input").type(`${newPwd}`);
        cy.get("button[type=submit]").click({timeout: 10000});
        cy.get("p[data-cy=pwdChangeConfirmation").should("be.visible")
        //now change the password again to see it works and to ensure configured password is still valid
        cy.reLogin(changePwdUserMail, newPwd);
        cy.openAppDrawer();
        cy.get("a[data-cy=changePasswordDrawerButton]").last().click();
        cy.get("div[data-cy=currentPassword] input").type(`${newPwd}`);
        cy.get("div[data-cy=newPassword] input").type(`${changePwdPwd}`);
        cy.get("div[data-cy=confirmedPassword] input").type(`${changePwdPwd}`);
        cy.get("button[type=submit]").click({timeout: 10000});
        cy.get("p[data-cy=pwdChangeConfirmation").should("be.visible");
    });

    it('Change password form cannot have any empty field',() => {
        cy.reLogin(changePwdUserMail, changePwdPwd);
        cy.navigateToChangePasswordForm();
        //confirmedPassword empty
        cy.get("div[data-cy=currentPassword] input").type(`${changePwdPwd}`);
        cy.get("div[data-cy=newPassword] input").type(`${newPwd}`);
        cy.get("button[type=submit]").click();
        cy.get("p[data-cy=pwdChangeConfirmation").should("not.be.visible");
        //newPassword empty
        cy.get("div[data-cy=confirmedPassword] input").type(`${newPwd}`);
        cy.get("div[data-cy=newPassword] input").clear();
        cy.get("button[type=submit]").click();
        cy.get("p[data-cy=pwdChangeConfirmation").should("not.be.visible");
        //currentPassword empty
        cy.get("div[data-cy=newPassword] input").type(`${newPwd}`);
        cy.get("div[data-cy=currentPassword] input").clear();
        cy.get("button[type=submit]").click();
        cy.get("p[data-cy=pwdChangeConfirmation").should("not.be.visible");
    });
    

    it('Invite', () => {
        cy.reLogin(testUserMail, testPwd);
        cy.navigateToInvitePage();
        cy.get("button[data-cy=copyToClipboardButton]").click();   
        //cypress opens an alert to confirm copying to clipboard - not sure what to do here (how to confirm it automatically)
        //const stub = cy.stub();
        //cy.on('window:alert', stub);
        //how to access text buffer? - https://github.com/cypress-io/cypress/issues/2386
        
    });
});