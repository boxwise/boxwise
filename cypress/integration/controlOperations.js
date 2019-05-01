import uuidv4 from "uuid/v4";

describe('Control operations', function() {
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
      });   

    it('Login -> logout', () => {
        cy.visit("http://localhost:3000/signout");
        cy.visit("http://localhost:3000/signin");
        cy.get("input[name=email]").type(`${testUserMail}`);
        cy.get("input[name=password]").type(`${testPwd}`);
        cy.get("button[type=submit]").click({ timeout: 10000}).then(() => {
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
        cy.get("input[name=currentPassword]").type(`${changePwdPwd}`);
        cy.get("input[name=newPassword]").type(`${newPwd}`);
        cy.get("input[name=confirmedPassword]").type(`${newPwd}`);
        cy.get("button[type=submit]").click({timeout: 10000});
        cy.get("p[data-cy=pwdChangeConfirmation").should("be.visible")
        //now change the password again to see it works and to ensure configured password is still valid
        cy.reLogin(changePwdUserMail, newPwd);
        cy.openAppDrawer();
        cy.get("a[data-cy=changePasswordDrawerButton]").last().click();
        cy.get("input[name=currentPassword]").type(`${newPwd}`);
        cy.get("input[name=newPassword]").type(`${changePwdPwd}`);
        cy.get("input[name=confirmedPassword]").type(`${changePwdPwd}`);
        cy.get("button[type=submit]").click()
        cy.get("p[data-cy=pwdChangeConfirmation").should("be.visible")
    });

    it('Change password form cannot have any empty field',() => {
        cy.reLogin(changePwdUserMail, changePwdPwd);
        cy.navigateToChangePasswordForm();
        //all three empty
        cy.get("button[type=submit]").click()
        cy.get("p[data-cy=pwdChangeConfirmation").should("not.be.visible")
        //confirmedPassword empty
        cy.get("input[name=currentPassword]").type(`${changePwdPwd}`);
        cy.get("input[name=newPassword]").type(`${newPwd}`);
        cy.get("button[type=submit]").click()
        cy.get("p[data-cy=pwdChangeConfirmation").should("not.be.visible")
        //newPassword empty
        cy.get("input[name=confirmedPassword]").type(`${newPwd}`);
        cy.get("input[name=newPassword]").clear();
        cy.get("button[type=submit]").click()
        cy.get("p[data-cy=pwdChangeConfirmation").should("not.be.visible")
        //currentPassword empty
        cy.get("input[name=newPassword]").type(`${newPwd}`);
        cy.get("input[name=currentPassword]").clear();
        cy.get("button[type=submit]").click()
        cy.get("p[data-cy=pwdChangeConfirmation").should("not.be.visible")
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