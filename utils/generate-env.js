const { promisify } = require("util");
const fs = require("fs");
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
const REACT_APP_FIREBASE_MESSAGING_SENDER_ID =
  "REACT_APP_FIREBASE_MESSAGING_SENDER_ID";
const REACT_APP_GOOGLE_ANALYTICS_CODE = "REACT_APP_GOOGLE_ANALYTICS_CODE";
const REACT_APP_SENTRY_URI = "REACT_APP_SENTRY_URI";

const env = mode || 'local';
const schema = {
  properties: {
    [REACT_APP_FIREBASE_API_KEY]: {
      description: "Firebase API Key"
    },
    [REACT_APP_FIREBASE_AUTH_DOMAIN]: {
      description: "Firebase auth domain"
    },
    [REACT_APP_FIREBASE_DATABASE_URL]: {
      description: "Firebase database url"
    },
    [REACT_APP_FIREBASE_PROJECT_ID]: {
      description: "Firebase project ID"
    },
    [REACT_APP_FIREBASE_STORAGE_BUCKET]: {
      description: "Firebase storage bucket"
    },
    [REACT_APP_FIREBASE_MESSAGING_SENDER_ID]: {
      description: "Firebase messaging sender ID"
    },
    [REACT_APP_GOOGLE_ANALYTICS_CODE]: {
      description: "Google Analytics code"
    },
    [REACT_APP_SENTRY_URI]: {
      description: "Sentry URI"
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
