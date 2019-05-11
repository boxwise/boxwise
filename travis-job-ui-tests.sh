cp .travis/.env.feature-tests ./.env.local
yarn start &
cypress run --record