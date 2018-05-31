import "babel-polyfill";
import * as firestore from "expect-firestore";
import path from "path";

let describeButSkipIfNoKey = describe;
let serviceAccountKey;
try {
  serviceAccountKey = require("../../.service-account-key.json");
} catch (e) {
  describeButSkipIfNoKey = describe.skip;
}

const TEST_DATA = {
  organizations: [
    {
      key: "1",
      fields: { name: "Org 1" },
      collections: {}
    },
    {
      key: "2",
      fields: { name: "Org 2" },
      collections: {}
    }
  ],
  profiles: [
    {
      key: "org1",
      fields: { organization: "organizations/1" },
      collections: {}
    },
    {
      key: "org2",
      fields: { organization: "organizations/2" },
      collections: {}
    }
  ]
};

describeButSkipIfNoKey("firestore.rules", () => {
  let database;

  beforeAll(async () => {
    database = new firestore.Database({
      credential: serviceAccountKey
    });
    await database.authorize();
    database.setRulesFromFile(path.join(__dirname, "../../firestore.rules"));
  });

  describe("/products", () => {
    beforeEach(() => {
      database.setData({
        ...TEST_DATA,
        products: [
          {
            key: "1",
            fields: {
              name: "Socks",
              organization: "organizations/1"
            },
            collections: {}
          }
        ]
      });
    });
    test("products can only be created for an organization by a user in that organization", async () => {
      firestore.assert(
        await database.canSet({ uid: "org1" }, "products/5437890", {
          name: "T-Shirts",
          organization: "organizations/1"
        })
      );
      firestore.assert(
        await database.cannotSet({ uid: "org1" }, "products/03248", {
          name: "Underwear",
          organization: "organizations/2"
        })
      );
    });
    test("products can only be updated by correct organization", async () => {
      firestore.assert(
        await database.canUpdate({ uid: "org1" }, "products/1", {
          name: "Long Socks",
          organization: "organizations/1"
        })
      );
      firestore.assert(
        await database.cannotUpdate({ uid: "org2" }, "products/1", {
          name: "Long Socks",
          organization: "organizations/1"
        })
      );
    });
    test("organization cannot be changed", async () => {
      firestore.assert(
        await database.cannotUpdate({ uid: "org1" }, "products/1", {
          name: "Long Socks",
          organization: "organization/2"
        })
      );
    });
    test("products can only be deleted by correct organization", async () => {
      firestore.assert(
        await database.cannotCommit({ uid: "org2" }, [
          firestore.Batch.delete("products/1")
        ])
      );
      firestore.assert(
        await database.canCommit({ uid: "org1" }, [
          firestore.Batch.delete("products/1")
        ])
      );
    });
  });

  describe("/invites", () => {
    beforeEach(() => {
      database.setData({
        ...TEST_DATA,
        invites: [
          {
            key: "1",
            fields: {
              organization: "organizations/1"
            },
            collections: {}
          }
        ]
      });
    });

    test("invites can only be created for an organization by a user in that organization", async () => {
      firestore.assert(
        await database.canSet({ uid: "org1" }, "invites/5437890", {
          organization: "organizations/1"
        })
      );
      firestore.assert(
        await database.cannotSet({ uid: "org1" }, "invites/03248", {
          organization: "organizations/2"
        })
      );
    });

    test("unauthenticated users can get invites", async () => {
      firestore.assert(await database.canGet({}, "invites/1"));
    });
    // Unsupported: https://github.com/GitbookIO/expect-firestore/issues/11
    test.skip("invites cannot be listed", async () => {});
    test("invites cannot be updated", async () => {
      firestore.assert(
        await database.cannotUpdate({ uid: "org1" }, "invites/1", {
          organization: "organizations/org1"
        })
      );
    });
    test("invites cannot be deleted", async () => {
      firestore.assert(
        await database.cannotCommit({ uid: "org1" }, [
          firestore.Batch.delete("invites/1")
        ])
      );
    });
  });

  // WIP
  describe.skip("/profiles", () => {
    beforeEach(() => {
      database.setData(TEST_DATA);
    });

    test("profiles for a user can only be created by that user", async () => {
      firestore.assert(
        await database.canSet({ uid: "org1" }, "profiles/1", {
          organization: "organizations/1"
        })
      );
      firestore.assert(
        await database.cannotSet({ uid: "org1" }, "invites/03248", {
          organization: "organizations/2"
        })
      );
    });
    test("profiles cannot be updated", async () => {
      firestore.assert(
        await database.cannotUpdate({ uid: "org1" }, "profiles/org1", {
          organization: "organizations/org1"
        })
      );
    });
    test("invites cannot be deleted", async () => {
      firestore.assert(
        await database.cannotCommit({ uid: "org1" }, [
          firestore.Batch.delete("invites/1")
        ])
      );
    });
  });
});
