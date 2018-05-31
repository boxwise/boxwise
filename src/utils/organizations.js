import firebase from "../firebase";
import uuidv4 from "uuid/v4";

const db = firebase.firestore();

export const getOrCreateInviteCode = organizationId => {
  return db
    .collection("organizations")
    .doc(organizationId)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return Promise.reject(new Error("Organization doesn't exist"));
      }
      const org = doc.data();
      if (org.inviteCodes && org.inviteCodes[0]) {
        return Promise.resolve(org.inviteCodes[0]);
      }
      const inviteCode = uuidv4();
      return db
        .collection("organizations")
        .doc(organizationId)
        .update({ inviteCodes: [inviteCode] })
        .then(() => {
          return Promise.resolve(inviteCode);
        });
    });
};

export const createInviteLink = inviteCode => {
  const url = window.location;
  return `${url.protocol}//${url.host}/join/${inviteCode}`;
};
