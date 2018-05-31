import firebase, { firestore } from "./firebase";

export const setProfile = (user, data) => {
  return firestore
    .collection("profiles")
    .doc(user.uid)
    .set(data);
};

export const createUserAndProfile = ({ email, password }, profile) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return setProfile(user, profile);
    });
};
