import React from "react";
import { FirestoreCollection } from "react-firestore";
import firebase from "firebase/app";

const ProductsCollection = ({ organizationRef, ...props }) => (
  <FirestoreCollection
    path="products"
    filter={[
      ["organization", "==", firebase.firestore().doc(organizationRef)],
      ["isDeleted", "==", false]
    ]}
    sort="category:asc,name:asc"
    {...props}
  />
);
export default ProductsCollection;
