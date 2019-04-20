[![Build Status](https://travis-ci.com/boxwise/boxwise.svg?branch=master)](https://travis-ci.com/boxwise/boxwise)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/boxwise/boxwise/master.svg?style=flat-square)](https://codecov.io/gh/boxwise/boxwise/)

# Boxwise

Boxwise makes it easy for organizations (such as refugee camps) to distribute donated goods to people in need. It consists of:

- **A point of sale system for running a shop.** Boxwise distributes tokens that people can use to buy the things they need (clothes, food, toiletries, etc). They can choose carefully and try things on instead of just being given something they don’t want. The app registers people, gives them tokens, and manages all transactions in the shop.
- **A warehouse management system.** Warehouses full of donated goods can quickly turn to chaos. Boxwise makes sure organizations know what they have, where it is, and what they need to restock. There is not even any complicated hardware involved -- only a smartphone is needed.

This is a new version of [the original Drop App used by Drop In The Ocean](https://www.drapenihavet.no/en/the-drop-app-2/). The original app was limited to just managing a single organization. This is a rewrite to support multiple organizations on a centrally hosted system.

## Contributing

We are always looking for help. Working on this project is an opportunity to use your skills to help thousands of refugees. [Our contributing guide](CONTRIBUTING.md) has more information.

## Setting up development environment

1.  [Install Node.js](https://nodejs.org/en/download/). You'll also need to install Yarn:

        $ curl -o- -L https://yarnpkg.com/install.sh | bash

    (Or `brew install yarn`.)

2.  Install Node dependencies:

        $ yarn

    You will need to run this again if the `package.json` or `yarn.lock` files are changed by you or somebody else.

3.  Set up an app on Firebase to use as your development environment.

    - Go to https://console.firebase.google.com/ and click "Add project";
    - Enter "Boxwise Development" into the name field and click "Create Project";
    - Click "Database" in the left hand menu, click "Create Database" underneath Cloud Firestore;
    - Choose "Start in locked mode" in the "Security rules for Cloud Firestore' dialog;
    - Click "Authentication" in the left hand menu, then the "Sign-in method" tab, then click "Email/Password", flip the first "Enable" switch, then click "Save".

4. Create a new local config running `yarn setup`, filling with the Firebase project ID (you may be asked to login). This will create a `.env.local` file.
    - **How to get the Firebase project ID:** Click on the settings gear next to "Project Overview". A dropdown menu will be shown, click on "Project Configuration".
    The project ID will be listed on first card (Your project). Will be the item right over the API key.

5.  Log into Firebase, then select the app you created in the previous step. Give it the alias "development".

        $ yarn run firebase login
        $ yarn run firebase use --add

6.  Deploy database rules to your development app.

        $ yarn run deploy-firestore

    You will need to run this again if the `firestore.rules` file is changed by you or somebody else.

## Running the development environment

    $ yarn start

The first thing you'll want to do when running a new development environment is set up an organization. [The development environment currently has no test data.](https://github.com/boxwise/boxwise/issues/24)

## Creating a test account

To be able to use the app locally you will need to create a user account. This can be accomplished by navigating to http://localhost:3000/create-organization and following the instructions on screen.

## Running tests

    $ yarn test

If you encounter "Error: EMFILE: too many open files" error in this step, try to install [Watchman](https://facebook.github.io/watchman/docs/install.html). Make sure that `brew` is installed in your machine. 
    
    // install brew
    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    $ brew update
    
    // install Watchman
    $ brew install watchman

## Running the database tests

We have some tests that check the Firestore database security rules are set up correctly. They have to run against a real database.

To set it up, click "⚙️" then "Project Settings" in the development app you created above. Click the "Service Accounts" tab, then click "Generate New Private key". Save this file to `.service-account-key.json` in the root of the project. Take care not to share it or commit it to the repository!

Now, when you run `yarn test`, the database tests will run automatically.

## Community

[We have a Slack for discussing development and for users to get support.](https://join.slack.com/t/boxwise/shared_invite/enQtMzE4NzExMjkxNTM2LTk0MzY2Mjg0MTY5ZmJjMjI1ODNmODZiNmJlNTAwM2Y4MmJkZDJjZWEyNzk0YTQyZGI0ZTYxMTc2NTgxNjk1ZTM)
