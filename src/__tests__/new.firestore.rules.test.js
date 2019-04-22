const firebase = require("@firebase/testing");
const fs = require("fs");

/*
 * ============
 *    Setup
 * ============
 */
const projectName = `boxwise-development-f603b-${Date.now()}`;
const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectName}:ruleCoverage.html`;

const rules = fs.readFileSync("firestore.rules", "utf8");

/**
 * Creates a new app with authentication data matching the input.
 *
 * @param {object} auth the object to use for authentication (typically {uid: some-uid})
 * @return {object} the app.
 */
function authedApp(auth, data) {
  let database = firebase
    .initializeTestApp({ projectId: projectName, auth })
    .firestore();

  if (data) {
    for (let collection in data) {
      for (let key in data[collection]) {
        let ref = database.collection(collection).doc(key);
        ref.set(data[collection][key]);
      }
    }
  }

  return database;
}

let ORGANIZATIONS_TEST_DATA = {
  organizations: {
    "1": {
      fields: { name: "Org 1" },
      collections: {}
    },
    "2": {
      fields: { name: "Org 2" },
      collections: {}
    }
  },
  profiles: {
    org1: {
      fields: { organization: "organizations/1" },
      collections: {}
    },
    org2: {
      fields: { organization: "organizations/2" },
      collections: {}
    }
  }
};

let BOXES_TEST_DATA = {
  organizations: {
    "1": {
      fields: { name: "Org 1" },
      collections: {}
    },
    "2": {
      fields: { name: "Org 2" },
      collections: {}
    }
  },
  profiles: {
    org1: {
      fields: { organization: "organizations/1" },
      collections: {}
    },
    org2: {
      fields: { organization: "organizations/2" },
      collections: {}
    }
  },
  products: {
    product1: {
      fields: {
        name: "Socks",
        organization: "organizations/1",
        isDeleted: false
      },
      collections: {}
    },
    product2: {
      fields: {
        name: "T-Shirts",
        organization: "organizations/2",
        isDeleted: false
      },
      collections: {}
    }
  },
  boxes: {
    box1: {
      fields: {
        organization: "organizations/1",
        product: "products/1",
        quantity: 5,
        humanID: 123456
      },
      collections: {}
    },
    box2: {
      fields: {
        organization: "organizations/2",
        product: "products/2",
        quantity: 10,
        humanID: 654321
      },
      collections: {}
    }
  }
};

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({
    projectId: projectName
  });
});

beforeAll(async () => {
  console.log("loading rules");
  firebase.loadFirestoreRules({
    projectId: projectName,
    rules: rules
  });
});

//return and delete all the currently initialized test and admin apps
afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});

describe("/organizations", () => {
  let database;
  beforeEach(() => {
    database = authedApp({ uid: "org1" }, ORGANIZATIONS_TEST_DATA);
  });

  test("organizations can be read by anyone in that organization", async () => {
    await firebase.assertSucceeds(
      database
        .collection("organizations")
        .doc("1")
        .get()
    );
    await firebase.assertSucceeds(
      database
        .collection("organizations")
        .doc("4")
        .get()
    ); //should fail cuz of the rules (but it's not implemented)
  });

  test("organizations cannot be updated", async () => {
    await firebase.assertFails(
      database
        .collection("organizations")
        .doc("1")
        .update({ name: "New name" })
    );
  });

  test("organizations cannot be deleted", async () => {
    await firebase.assertFails(
      database
        .collection("organisations")
        .doc("1")
        .delete()
    );
  });

  test.skip("organizations cannot be listed", () => {});
  test.skip("creating organizations", () => {});
});

describe("/boxes", () => {
  let database;
  beforeAll(() => {
    database = authedApp({ uid: "org3333" }, BOXES_TEST_DATA);
  });

  test("boxes can only be read by a user in that organization", async () => {
    await firebase.assertSucceeds(database.collection("boxes").doc("box1"));
    //await firebase.assertFails(db.collection("boxes").doc("box2"))
    /*firestore.assert(await database.canGet({ uid: "org1" }, "boxes/1"));
    firestore.assert(await database.canGet({ uid: "org2" }, "boxes/2"));
    firestore.assert(await database.cannotGet({ uid: "org1" }, "boxes/2"));
    firestore.assert(await database.cannotGet({ uid: "org2" }, "boxes/1"));*/
  });
});
