import React from "react";
import { connect } from "react-redux";
import ProductTable from "./ProductTable";
import { FirestoreCollection } from "react-firestore";
import { firestore } from "../firebase";

const ProductTableContainer = ({ profile }) => {
  if (profile.isFetching) {
    return <ProductTable isLoading={true} products={[]} />;
  }
  return (
    <FirestoreCollection
      path="products"
      filter={["organization", "==", firestore.doc(profile.organization.ref)]}
      render={({ isLoading, data }) => {
        return <ProductTable isLoading={isLoading} products={data} />;
      }}
    />
  );
};

export default connect(state => ({
  profile: state.profile
}))(ProductTableContainer);
