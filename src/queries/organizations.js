import firebase from "../firebase";

const db = firebase.firestore();

export const addOrganization = ({ name }) => {
  return db.collection("organizations").add({
    name: name,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};

export const getOrAddDummyOrganization = () => {
  return db
    .collection("organizations")
    .get()
    .then(organizations => {
      if (organizations.empty) {
        return addOrganization({ name: "Boxaid" });
      } else {
        return Promise.resolve(organizations.docs[0].ref);
      }
    });
};
