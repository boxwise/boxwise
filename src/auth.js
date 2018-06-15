import firebase, { firestore } from "./firebase";

export const setProfile = ({ uid }, data) => {
  return firestore
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
