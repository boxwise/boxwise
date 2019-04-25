import uuidv4 from "uuid/v4";

describe('Create and delete boxes', function() {
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
    })

    beforeEach(function() {        
        cy.reLogin(testUserMail, testPwd);
    });

    it('Create new products', () => {
        cy.visit("http://localhost:3000/products"), {
            onLoad: (contentWindow) => {
                debugger;
                cy.get('button[data-cy=addProductButton]').should('be.visible');
                cy.get('button[data-cy=addProductButton]').click();
                cy.get('#select-category').click();
                cy.get('li[tabindex=0]').click();
                cy.get('input[name=name]').type(`${testProduct}{enter}`);
            }
        };
        
        
        //cy.get('button[tabindex=0]').click()
    });

    it('Create new products', () => {
        cy.visit("http://localhost:3000/products");
        cy.get('button[data-cy=addProductButton]').should('be.visible');
        cy.get('button[data-cy=addProductButton]').click();
        cy.get('#select-category').click();
        cy.get('li[tabindex=0]').click();
        cy.get('input[name=name]').type(`${testProduct}{enter}`);
    });


    /*
    it('Create new box', () => {
        cy.get('button[data-cy=makeBoxButton]').click()
        
    });
    */
    
})