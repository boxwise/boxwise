import React from "react";
import BoxTable from "./BoxTable";
import { connect } from "react-redux";
import { FirestoreCollection } from "react-firestore";
import { firestore } from "../firebase";

const BoxTableContainer = ({ profile }) => {
  if (profile.isFetching) {
    return <BoxTable isLoading={true} boxes={[]} />;
  }
  return (
    <FirestoreCollection
      path="boxes"
      filter={["organization", "==", firestore.doc(profile.organization.ref)]}
      render={({ isLoading, data }) => {
        return <BoxTable isLoading={isLoading} boxes={data} />;
      }}
    />
  );
};

export default connect(state => ({
  profile: state.profile
}))(BoxTableContainer);
