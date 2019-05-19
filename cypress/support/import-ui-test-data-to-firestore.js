// eslint-disable-next-line
const admin = require("firebase-admin");
// eslint-disable-next-line
const serviceAccount = require("./serviceAccountKey.json");

/* DECIDE INTO WHICH FIRESTORE SHOULD DATA BE IMPORTED */
let projectId = process.argv[2]; // [0] is node command, [1] is name of script, [2] is parameter
if (projectId === undefined) {
  // eslint-disable-next-line no-console
  console.log("Importing data into 'Boxwise Feature Tests' firestore");
  projectId = "boxwise-feature-tests";
} else {
  // eslint-disable-next-line no-console
  console.log(`Importing data into firestore of project with ID: ${projectId}`);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${projectId}.firebaseio.com`
});

/* IMPORT DATA */
const testOrgName = "itworks3";
const testUserName = "itworks3";
const testUserEmail = "itwork3@example.com";
const testUserPwd = "itworks3";

admin
  .auth()
  .listUsers()
  .then(listUsersResult => {
    const selectedUser = listUsersResult.users.filter(
      usr => usr.email.toLocaleLowerCase() === testUserEmail
    );
    if (selectedUser.length === 0) {
      const testOrg = {
        name: testOrgName,
        createdAt: Date()
      };
      admin
        .firestore()
        .collection("organizations")
        .add(testOrg)
        .then(createdTestOrg => {
          // eslint-disable-next-line no-console
          console.log("Successfully created new org:", createdTestOrg.id);
          admin
            .auth()
            .createUser({
              email: testUserEmail,
              password: testUserPwd,
              displayName: testUserName,
              emailVerified: false
            })
            .then(userRecord => {
              // eslint-disable-next-line no-console
              console.log("Successfully created new user:", userRecord.uid);
              const testUser = {
                name: userRecord.displayName,
                organization: admin
                  .firestore()
                  .doc(`organizations/${createdTestOrg.id}`)
              };
              admin
                .firestore()
                .collection("profiles")
                .doc(userRecord.uid)
                .set(testUser)
                .then(() => {
                  // eslint-disable-next-line no-console
                  console.log("Successfully created new user profile");
                  process.exit(0);
                })
                .catch(error => {
                  // eslint-disable-next-line no-console
                  console.log("Error creating test user profile:", error);
                  process.exit(1);
                });
            })
            .catch(error => {
              // eslint-disable-next-line no-console
              console.log("Error creating test user:", error);
              process.exit(1);
            });
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log("Error creating test organization:", error);
          process.exit(1);
        });
    }
  });
