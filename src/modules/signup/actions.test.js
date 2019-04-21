import firebase from "firebase.js";

import { getOrAddInvite } from "./actions";

const db = firebase.firestore();

// firebase mock doesn't support querying by reference
test.skip("getOrAddInvite", () => {
  return db
    .collection("organizations")
    .add({ name: "Boxaid" })
    .then(org => {
      // First time we run it, it should give us a new invite code
      return getOrAddInvite(`organizations/${org.id}`).then(invite => {
        expect(invite.id).not.toBeNull();
        // Second time we run it, it should return us the same invite code
        return getOrAddInvite(org.id).then(secondInvite => {
          expect(secondInvite.id).toEqual(invite.id);
        });
      });
    });
});
