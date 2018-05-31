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
      path={"boxes"}
      filter={["organization", "==", firestore.doc(profile.organization.ref)]}
      render={boxresult => {
        return (
          <FirestoreCollection
            path={"products"}
            filter={[
              "organization",
              "==",
              firestore.doc(profile.organization.ref)
            ]}
            render={productresult => {
              return (
                <BoxTable
                  isLoading={boxresult.isLoading || productresult.isLoading}
                  boxes={boxresult.data}
                  products={productresult.data}
                />
              );
            }}
          />
        );
      }}
    />
  );
};

export default connect(state => ({
  profile: state.profile
}))(BoxTableContainer);
