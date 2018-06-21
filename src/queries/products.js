import React from "react";
import { FirestoreCollection } from "react-firestore";
import { firestore } from "../firebase";

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

export const ProductsCount = ({ organizationRef, render, ...props }) => (
  <FirestoreCollection
    path="boxes"
    filter={[["organization", "==", firestore.doc(organizationRef)]]}
    {...props}
    render={({ isLoading, data }) => {
      if (isLoading) {
        return render(isLoading, data);
      }

      let counts = {};
      data.forEach(box => {
        counts[box.product.id] = (counts[box.product.id] || 0) + box.quantity;
      });

      return render({ isLoading, data: counts });
    }}
  />
);
