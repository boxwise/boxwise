import React from "react";
import { FirestoreCollection } from "react-firestore";

import { db } from "firebaseFactory";

const ProductsCollection = ({ organizationRef, ...props }) => (
  <FirestoreCollection
    path="products"
    filter={[
      ["organization", "==", db.doc(organizationRef)],
      ["isDeleted", "==", false]
    ]}
    sort="category:asc,name:asc"
    {...props}
  />
);
export default ProductsCollection;
