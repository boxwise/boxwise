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
        users: [
          {
            key: "org1",
            fields: { organizations: ["organizations/1"] },
            collections: {}
          },
          {
            key: "org2",
            fields: { organizations: ["organizations/2"] },
            collections: {}
          }
        ],
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
    test("products can be only be created for an organization by a user in that organization", async () => {
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
});
