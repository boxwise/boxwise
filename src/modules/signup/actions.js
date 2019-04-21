import firebase from "firebase.js";

const db = firebase.firestore();

const setProfile = ({ uid }, data) => {
  return db
    .collection("profiles")
    .doc(uid)
    .set(data);
};

export const createUserAndProfile = ({ email, password }, profile) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => setProfile(user.toJSON(), profile));
};

export const addInvite = organizationRef => {
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
        return addInvite(organizationRef);
      }
      return Promise.resolve(snapshot.docs[0].ref);
    });
};

export const createInviteLink = invite => {
  const url = window.location;
  return `${url.protocol}//${url.host}/join/${invite.id}`;
};

export const addOrganization = ({ name }) => {
  return db.collection("organizations").add({
    name: name,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};
