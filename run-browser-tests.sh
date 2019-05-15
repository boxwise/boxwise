cp .travis/.env.feature-tests ./.env.local
yarn start &
yarn wait-on http://localhost:3000
yarn cypress run --record