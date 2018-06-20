const { join } = require("path");
const execa = require("execa");

const currentDir = process.cwd();
const deployfile = "firestore.rules";
const deployfilePath = join(currentDir, deployfile);

try {
  const { stdout: output1 } = execa.sync("yarnhook", [], {"env": {"YARNHOOK_DRYRUN": "true"}});
  console.log(output1);
} catch (e) {
  if (e.message.includes('Command "yarnhook" not found')) {
    console.error("yarnhook not installed. Run 'yarn'.");
    process.exit(1);
  }
  throw e;
}

// run a git diff on the deploy file
const { stdout: output2 } = execa.sync(
  "git",
  ["diff", "HEAD@{1}..HEAD@{0}", "--", deployfilePath],
  { cwd: currentDir }
);

// if diff exists, update dependencies
if (output2.length > 0) {
  console.warn(
    `There have been changes to the database configuration. You should run \'yarn run deploy-firestore\' to deploy them.`
  );
}
