const { promisify } = require("util");
const fs = require("fs");
const { setup, login } = require("firebase-tools");
const { resolve } = require("path");
const prompt = require("prompt");
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
const schema = {
  properties: {
    [REACT_APP_FIREBASE_PROJECT_ID]: {
      description: "Firebase project ID",
      required: true
    },
    [REACT_APP_GOOGLE_ANALYTICS_CODE]: {
      description: "[optional] Google Analytics code"
    },
    [REACT_APP_SENTRY_URI]: {
      description: "[optional] Sentry URI"
    }
  }
};

if (help) {
  console.info(`Generates a project configuration. Defaults "mode" to local.
  Usage:
    generate-env [--mode <env>]`);
  process.exit(0);
}

process.on("SIGINT", () => {
  console.info("exiting...");
});

console.info(`Creating config file of ${env} environment`);
prompt.start();
get(schema)
  .then(getFBConfig)
  .then(createConfig)
  .then(writeConfig)
  .catch(err => console.log(err.message));

function createConfig(res) {
  const entry = key => `${key}=${res[key] || ""}`;
  return Object.keys(res)
    .map(entry)
    .join("\n");
}

function writeConfig(content) {
  const file = resolve(process.cwd(), `.env.${env}`);
  return writeFile(file, content);
}

function getFBConfig({ REACT_APP_FIREBASE_PROJECT_ID, ...answers }) {
  console.info("Getting FireBase configuration. This may take a while...");
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