cp .travis/.env.feature-tests ./.env.local
cypress run --spec "cypress/integration/signupOrganization.js"