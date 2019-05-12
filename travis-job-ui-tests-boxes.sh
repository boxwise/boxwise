cp .travis/.env.feature-tests ./.env.local
cypress run --spec "cypress/integration/productsTests.js"