cp .travis/.env.feature-tests ./.env.local
yarn start &
cypress run --record --spec "cypress/integration/signupOrganization.js"