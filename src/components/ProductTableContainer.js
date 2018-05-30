import React from "react";
import { connect } from "react-redux";
import ProductTable from "./ProductTable";
import { FirestoreCollection } from "react-firestore";
import firebase from "../firebase";

const ProductTableContainer = ({ organisation }) => {
  if (!organisation) {
    return null;
  }
  return (
    <FirestoreCollection
      path="products"
      filter={[
        "organisation",
        "==",
        firebase.firestore().doc("organisations/" + organisation)
      ]}
      render={({ isLoading, data }) => {
        return <ProductTable isLoading={isLoading} products={data} />;
      }}
    />
  );
};

export default connect(({ organisation }) => ({
  organisation: organisation
}))(ProductTableContainer);
