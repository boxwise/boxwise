import firebase from "firebase.js";

const db = firebase.firestore();

export const addOrganization = ({ name }) => {
  return db.collection("organizations").add({
    name: name,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};
