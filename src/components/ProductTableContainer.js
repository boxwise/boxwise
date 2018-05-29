import React from "react";
import ProductTable from "./ProductTable";
import { FirestoreCollection } from "react-firestore";

const ProductTableContainer = () => (
  <FirestoreCollection
    path="products"
    render={({ isLoading, data }) => {
      return <ProductTable isLoading={isLoading} products={data} />;
    }}
  />
);

export default ProductTableContainer;
