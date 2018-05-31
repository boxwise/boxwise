import firebase, { firestore } from "./firebase";

export const setProfile = (user, data) => {
  return firestore
    .collection("profiles")
    .doc(user.uid)
    .set(data);
};

export const getOrAddDummyOrganization = () => {
  return firestore
    .collection("organizations")
    .get()
    .then(organizations => {
      if (organizations.empty) {
        return firestore.collection("organizations").add({ name: "Boxaid" });
      } else {
        return Promise.resolve(organizations.docs[0].ref);
      }
    });
};

export const createUserAndProfile = ({ email, password }, profile) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return setProfile(user, profile);
    });
};
