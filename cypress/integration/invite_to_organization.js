import uuidv4 from "uuid/v4";

describe('Invite to organization', function() {
    let testOrg;
    let testUser;
    let testUserMail;
    let testPwd;
    let testProduct;

    before(function() {
        cy.getTestData().then(($result) => {
            testOrg = $result.testOrg;
            testUser = $result.testUser;
            testUserMail = $result.testUserMail;
            testPwd = $result.testPwd;
            testProduct = $result.testProduct;
        });
      });
    
    beforeEach(function() {        
        cy.reLogin(testUserMail, testPwd);
    });

    it('Copy invitation to buffer', () => {
        //cy.visit('http://localhost:3000/invite');
        //cy.get("button[type=button]").click();
        //how to access text buffer? - https://github.com/cypress-io/cypress/issues/2386
        //https://github.com/cypress-io/cypress/issues/1123
    });

})