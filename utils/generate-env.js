const { promisify } = require("util");
const fs = require("fs");
const { setup, login } = require("firebase-tools");
const { resolve } = require("path");
const prompt = require("prompt");
const { blue, red, green, yellow, white, bold } = require("colors/safe");
const { help, mode, _ } = require("minimist")(process.argv.slice(2));

const get = promisify(prompt.get);
const writeFile = promisify(fs.writeFile);

const REACT_APP_FIREBASE_API_KEY = "REACT_APP_FIREBASE_API_KEY";
const REACT_APP_FIREBASE_AUTH_DOMAIN = "REACT_APP_FIREBASE_AUTH_DOMAIN";
const REACT_APP_FIREBASE_DATABASE_URL = "REACT_APP_FIREBASE_DATABASE_URL";
const REACT_APP_FIREBASE_PROJECT_ID = "REACT_APP_FIREBASE_PROJECT_ID";
const REACT_APP_FIREBASE_STORAGE_BUCKET = "REACT_APP_FIREBASE_STORAGE_BUCKET";
const REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "REACT_APP_FIREBASE_MESSAGING_SENDER_ID";
const REACT_APP_GOOGLE_ANALYTICS_CODE = "REACT_APP_GOOGLE_ANALYTICS_CODE";
const REACT_APP_SENTRY_URI = "REACT_APP_SENTRY_URI";

const env = mode || 'local';
const info = bold(blue("(") + white("?") + blue(")"));

const schema = {
  properties: {
    [REACT_APP_FIREBASE_PROJECT_ID]: {
      description: white("Firebase project ID"),
      required: true
    },
    [REACT_APP_GOOGLE_ANALYTICS_CODE]: {
      description: white("[optional] Google Analytics code")
    },
    [REACT_APP_SENTRY_URI]: {
      description: white("[optional] Sentry URI")
    }
  }
};

if (help) {
  console.info(`
Generates a project configuration. Defaults "mode" to local.
  Usage:
    generate-env [--mode <env>]

  ${info} Parameters:
    Firebase project ID: Click on the settings gear next to "Project Overview" and on "Project Configuration".
    The project ID will be listed on first card.
`);
  process.exit(0);
}

process.on("SIGINT", () => {
  console.info(red("exiting..."));
});

console.info(green(`Creating config file of ${env} environment`));
console.info(`${info} ${white('For more information about parameters run with --help')}`);

prompt.start();
get(schema)
  .then(getFBConfig)
  .then(createConfig)
  .then(writeConfig)
  .catch(err => console.log(red(err.message)));

function createConfig(res) {
  const entry = key => `${key}=${res[key] || ""}`;
  return Object.keys(res)
    .map(entry)
    .join("\n")
    .padEnd(1, "\n");
}

function writeConfig(content) {
  const file = resolve(process.cwd(), `.env.${env}`);
  return writeFile(file, content);
}

function getFBConfig({ REACT_APP_FIREBASE_PROJECT_ID, ...answers }) {
  console.warn(yellow("Fetching FireBase configuration. This may take a while..."));
  return login()
    .then(() => setup.web({ project: REACT_APP_FIREBASE_PROJECT_ID }))
    .then(mapFBConfig)
    .then(fbConfig => ({ ...fbConfig, ...answers }))
}

function mapFBConfig({ apiKey, databaseURL, storageBucket, authDomain, messagingSenderId, projectId }) {
  return {
    [REACT_APP_FIREBASE_API_KEY]: apiKey,
    [REACT_APP_FIREBASE_DATABASE_URL]: databaseURL,
    [REACT_APP_FIREBASE_STORAGE_BUCKET]: storageBucket,
    [REACT_APP_FIREBASE_AUTH_DOMAIN]: authDomain,
    [REACT_APP_FIREBASE_MESSAGING_SENDER_ID]: messagingSenderId,
    [REACT_APP_FIREBASE_PROJECT_ID]: projectId
  }
}