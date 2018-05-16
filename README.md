# Drop App

Drop App makes it easy for organisations (such as refugee camps) to distribute donated goods to people in need. It consists of:

* **A point of sale system for running a shop.** Drop App distributes tokens that people can use to buy the things they need (clothes, food, toiletries, etc). They can choose carefully and try things on instead of just being given something they don’t want. The app registers people, gives them tokens, and manages all transactions in the shop.
* **A warehouse management system.** Warehouses full of donated goods can quickly turn to chaos. Drop App makes sure organisations know what they have, where it is, and what they need to restock. There is not even any complicated hardware involved -- only a smartphone is needed.

This is a new version of [the original Drop App used by Drop In The Ocean](https://www.drapenihavet.no/en/the-drop-app-2/). The original app was limited to just managing a single shop. This is a rewrite to support multiple organisations on a centrally hosted system.

## Running in development

First, [install Node.js](https://nodejs.org/en/download/).

You'll also need to install Yarn:

    $ curl -o- -L https://yarnpkg.com/install.sh | bash

(Or `brew install yarn`.)

Install Node dependencies:

    $ yarn

Finally, run the development server:

    $ yarn start

# Running tests

    $ yarn test
