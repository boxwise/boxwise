import React from "react";
import { connect } from "react-redux";
import ProductTable from "./ProductTable";
import { FirestoreCollection } from "react-firestore";
import firebase from "../firebase";

const ProductTableContainer = ({ organization }) => {
  if (!organization) {
    return null;
  }
  return (
    <FirestoreCollection
      path="products"
      filter={[
        "organization",
        "==",
        firebase.firestore().doc("organizations/" + organization)
      ]}
      render={({ isLoading, data }) => {
        return <ProductTable isLoading={isLoading} products={data} />;
      }}
    />
  );
};

export default connect(({ organization }) => ({
  organization: organization
}))(ProductTableContainer);
