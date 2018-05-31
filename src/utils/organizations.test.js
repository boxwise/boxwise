import firebase from "../firebase";
import { getOrCreateInviteCode } from "./organizations";

test("getOrCreateInviteCode", () => {
  return firebase
    .firestore()
    .collection("organizations")
    .add({ name: "Boxaid" })
    .then(org => {
      // First time we run it, it should give us a new invite code
      return getOrCreateInviteCode(org.id).then(inviteCode => {
        expect(inviteCode).not.toBeNull();
        return org
          .get()
          .then(doc => {
            expect(doc.data().inviteCodes).toEqual([inviteCode]);

            // Second time we run it, it should return us the same invite code
            return getOrCreateInviteCode(org.id);
          })
          .then(secondInviteCode => {
            expect(secondInviteCode).toEqual(inviteCode);
          });
      });
    });
});
