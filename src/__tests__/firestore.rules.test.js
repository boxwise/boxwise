import "babel-polyfill";
import path from "path";

import * as firestore from "expect-firestore";

let describeButSkipIfNoKey = describe;
let serviceAccountKey;
try {
  serviceAccountKey = require(".service-account-key.json");
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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    database = new firestore.Database({
      credential: serviceAccountKey
    });
    await database.authorize();
    database.setRulesFromFile(path.join(__dirname, "../../firestore.rules"));
  });

  afterAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
  });

  describe("/organizations", () => {
    beforeEach(() => {
      database.setData({
        ...TEST_DATA
      });
    });

    test.skip("organizations can be read by anyone in that organization", async () => {
      firestore.assert(
        await database.canGet({ uid: "org1" }, "organizations/1")
      );
      firestore.assert(
        await database.cannotGet({ uid: "org1" }, "organizations/2")
      );
    });
    // Not supported
    test.skip("organizations cannot be listed", () => {});
    test.skip("creating organizations", () => {});
    test("organizations cannot be updated", async () => {
      firestore.assert(
        await database.cannotUpdate({ uid: "org1" }, "organizations/1", {
          name: "Blah"
        })
      );
    });
    test("organizations cannot be deleted", async () => {
      firestore.assert(
        await database.cannotCommit({ uid: "org1" }, [
          firestore.Batch.delete("organisations/1")
        ])
      );
    });
  });

  describe("/boxes", () => {
    beforeEach(() => {
      database.setData({
        ...TEST_DATA,
        products: [
          {
            key: "1",
            fields: {
              name: "Socks",
              organization: "organizations/1",
              isDeleted: false
            },
            collections: {}
          },
          {
            key: "2",
            fields: {
              name: "T-Shirts",
              organization: "organizations/2",
              isDeleted: false
            },
            collections: {}
          }
        ],
        boxes: [
          {
            key: "1",
            fields: {
              organization: "organizations/1",
              product: "products/1",
              quantity: 5,
              humanID: 123456
            },
            collections: {}
          },
          {
            key: "2",
            fields: {
              organization: "organizations/2",
              product: "products/2",
              quantity: 10,
              humanID: 654321
            },
            collections: {}
          }
        ]
      });
    });
    test("boxes can only be read by a user in that organization", async () => {
      firestore.assert(await database.canGet({ uid: "org1" }, "boxes/1"));
      firestore.assert(await database.canGet({ uid: "org2" }, "boxes/2"));
      firestore.assert(await database.cannotGet({ uid: "org1" }, "boxes/2"));
      firestore.assert(await database.cannotGet({ uid: "org2" }, "boxes/1"));
    });
    test("boxes can only be created for an organization by a user in that organization", async () => {
      firestore.assert(
        await database.canSet({ uid: "org1" }, "boxes/5437890", {
          product: "products/1",
          organization: "organizations/1"
        })
      );
      firestore.assert(
        await database.cannotSet({ uid: "org1" }, "boxes/03248", {
          product: "products/1",
          organization: "organizations/2"
        })
      );
    });
    test.skip("boxes can only be created that pointed to products owned by the organization", async () => {
      firestore.assert(
        await database.cannotSet({ uid: "org1" }, "boxes/03248fdshjk", {
          product: "products/2",
          organization: "organizations/1"
        })
      );
    });
    test("boxes cannot be updated", async () => {
      firestore.assert(
        await database.cannotUpdate({ uid: "org1" }, "boxes/1", {
          product: "products/2",
          organization: "organizations/1"
        })
      );
    });
    test("boxes cannot be deleted", async () => {
      firestore.assert(
        await database.cannotCommit({ uid: "org1" }, [
          firestore.Batch.delete("boxes/1")
        ])
      );
    });
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
    test.skip("invites can only be listed by organization", async () => {});
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

  describe("/profiles", () => {
    beforeEach(() => {
      database.setData({});
    });

    test("profiles can only be read by its user", async () => {
      database.setData(TEST_DATA);
      firestore.assert(await database.canGet({ uid: "org1" }, "profiles/org1"));
      firestore.assert(
        await database.cannotGet({ uid: "org1" }, "profiles/org2")
      );
    });
    test("profiles for a user can only be created by that user", async () => {
      firestore.assert(
        await database.cannotSet({ uid: "org1" }, "profiles/03248", {
          organization: "organizations/1"
        })
      );
      firestore.assert(
        await database.canSet({ uid: "org1" }, "profiles/org1", {
          organization: "organizations/1"
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
          firestore.Batch.delete("profiles/org1")
        ])
      );
    });
  });
});
