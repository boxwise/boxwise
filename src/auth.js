import firebase, { firestore } from "./firebase";

export const setProfile = (user, data) => {
  return firestore
    .collection("profiles")
    .doc(user.uid)
    .set(data);
};

export const createUserAndProfile = ({ email, password }) => {
  // HACK: For testing, add user to first organization that exists.
  return firestore
    .collection("organizations")
    .get()
    .then(organizations => {
      if (organizations.empty) {
        return firestore.add(
          { collection: "organizations" },
          { name: "Boxaid" }
        );
      } else {
        return Promise.resolve(organizations.docs[0].ref);
      }
    })
    .then(organization => {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          return setProfile(user, { organization });
        });
    });
};
