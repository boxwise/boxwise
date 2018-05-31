import firebase from "../firebase";

const db = firebase.firestore();

export const createInvite = organizationRef => {
  return db.collection("invites").add({
    organization: db.doc(organizationRef),
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};

export const getOrAddInvite = organizationRef => {
  return db
    .collection("invites")
    .where("organization", "==", db.doc(organizationRef))
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return createInvite(organizationRef);
      }
      return Promise.resolve(snapshot.docs[0].ref);
    });
};

export const createInviteLink = invite => {
  const url = window.location;
  return `${url.protocol}//${url.host}/join/${invite.id}`;
};
