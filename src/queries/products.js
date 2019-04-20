import React from "react";
import { FirestoreCollection } from "react-firestore";

import { firestore } from "firebase.js";

export const ProductsCollection = ({ organizationRef, ...props }) => (
  <FirestoreCollection
    path="products"
    filter={[
      ["organization", "==", firestore.doc(organizationRef)],
      ["isDeleted", "==", false]
    ]}
    sort="category:asc,name:asc"
    {...props}
  />
);
