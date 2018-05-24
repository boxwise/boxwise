# Drop App

Drop App makes it easy for organisations (such as refugee camps) to distribute donated goods to people in need. It consists of:

* **A point of sale system for running a shop.** Drop App distributes tokens that people can use to buy the things they need (clothes, food, toiletries, etc). They can choose carefully and try things on instead of just being given something they don’t want. The app registers people, gives them tokens, and manages all transactions in the shop.
* **A warehouse management system.** Warehouses full of donated goods can quickly turn to chaos. Drop App makes sure organisations know what they have, where it is, and what they need to restock. There is not even any complicated hardware involved -- only a smartphone is needed.

This is a new version of [the original Drop App used by Drop In The Ocean](https://www.drapenihavet.no/en/the-drop-app-2/). The original app was limited to just managing a single shop. This is a rewrite to support multiple organisations on a centrally hosted system.

## Setting up development environment

1.  [Install Node.js](https://nodejs.org/en/download/). You'll also need to install Yarn:

        $ curl -o- -L https://yarnpkg.com/install.sh | bash

    (Or `brew install yarn`.)

2.  Install Node dependencies:

        $ yarn

3.  Set up an app on Firebase to use as your development environment.

    * Go to https://console.firebase.google.com/ and click "Add project".
    * Enter "Drop App Development" into the name field and click "Create Project"
    * Once that has completed, click "Add Firebase to your web app"
    * Copy the configuration values in that code into a file called `.env.local`, without any quotes, in this format:

          REACT_APP_FIREBASE_API_KEY=...
          REACT_APP_FIREBASE_AUTH_DOMAIN=...
          REACT_APP_FIREBASE_DATABASE_URL=...
          REACT_APP_FIREBASE_PROJECT_ID=...
          REACT_APP_FIREBASE_STORAGE_BUCKET=...
          REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...

    * Click "Database" in the left hand menu, click "Get Started" underneath Cloud Firestore, then click "Enable".
    * Click "Authentication" in the left hand menu, click "Email/Password", flip the first "Enable" switch, then click "Save".

4.  Deploy database rules to your development app.

        $ firebase deploy --only firestore:rules

## Running the development environment

    $ yarn start

## Running tests

    $ yarn test
