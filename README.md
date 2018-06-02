# Boxwise

Boxwise makes it easy for organizations (such as refugee camps) to distribute donated goods to people in need. It consists of:

- **A point of sale system for running a shop.** Boxwise distributes tokens that people can use to buy the things they need (clothes, food, toiletries, etc). They can choose carefully and try things on instead of just being given something they don’t want. The app registers people, gives them tokens, and manages all transactions in the shop.
- **A warehouse management system.** Warehouses full of donated goods can quickly turn to chaos. Boxwise makes sure organizations know what they have, where it is, and what they need to restock. There is not even any complicated hardware involved -- only a smartphone is needed.

This is a new version of [the original Drop App used by Drop In The Ocean](https://www.drapenihavet.no/en/the-drop-app-2/). The original app was limited to just managing a single organization. This is a rewrite to support multiple organizations on a centrally hosted system.

## Setting up development environment

1.  [Install Node.js](https://nodejs.org/en/download/). You'll also need to install Yarn:

        $ curl -o- -L https://yarnpkg.com/install.sh | bash

    (Or `brew install yarn`.)

2.  Install Node dependencies:

        $ yarn

    You will need to run this again if the `package.json` or `yarn.lock` files are changed by you or somebody else.

3.  Set up an app on Firebase to use as your development environment.

    - Go to https://console.firebase.google.com/ and click "Add project".
    - Enter "Boxwise Development" into the name field and click "Create Project"
    - Once that has completed, click "Add Firebase to your web app"
    - Copy the configuration values in that code into a file called `.env.local`, without any quotes, in this format:

          REACT_APP_FIREBASE_API_KEY=...
          REACT_APP_FIREBASE_AUTH_DOMAIN=...
          REACT_APP_FIREBASE_DATABASE_URL=...
          REACT_APP_FIREBASE_PROJECT_ID=...
          REACT_APP_FIREBASE_STORAGE_BUCKET=...
          REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...

    - Click "Database" in the left hand menu, click "Get Started" underneath Cloud Firestore, then click "Enable".
    - Click "Authentication" in the left hand menu, click "Email/Password", flip the first "Enable" switch, then click "Save".

4.  Log into Firebase, then select the app you created in the previous step. Give it the alias "development".

        $ yarn run firebase login
        $ yarn run firebase use --add

5.  Deploy database rules to your development app.

        $ yarn run firebase deploy --only firestore:rules

    You will need to run this again if the `firestore.rules` file is changed by you or somebody else.

## Running the development environment

    $ yarn start

## Running tests

    $ yarn test

## Community

[We have a Slack for discussing development and for users to get support.](https://join.slack.com/t/boxwise/shared_invite/enQtMzE4NzExMjkxNTM2LTk0MzY2Mjg0MTY5ZmJjMjI1ODNmODZiNmJlNTAwM2Y4MmJkZDJjZWEyNzk0YTQyZGI0ZTYxMTc2NTgxNjk1ZTM)
