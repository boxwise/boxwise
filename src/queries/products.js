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
      console.log(`ProductsCount: isLoading=${isLoading}, data=${data}`);

      if (isLoading) {
        return render(isLoading, data);
      }

      let counts = {};
      data.forEach(box => {
        counts[box.product.id] = (counts[box.product.id] || 0) + box.quantity;
      });

      console.log("rendering w/ counts");
      return render({ isLoading, data: counts });
    }}
  />
);
