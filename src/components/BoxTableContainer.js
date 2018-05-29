import React from "react";
import BoxTable from "./BoxTable";
import { FirestoreCollection } from "react-firestore";

const BoxTableContainer = () => (
  <FirestoreCollection
    path="boxes"
    render={({ isLoading, data }) => {
      if (isLoading) {
        return <p>Loading</p>;
      }
      return <BoxTable boxes={data} />;
    }}
  />
);

export default BoxTableContainer;
