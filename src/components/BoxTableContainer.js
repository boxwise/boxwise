import React from "react";
import BoxTable from "./BoxTable";
import { FirestoreCollection } from "react-firestore";

const BoxTableContainer = () => (
  <FirestoreCollection
    path="boxes"
    render={({ isLoading, data }) => {
      return <BoxTable isLoading={isLoading} boxes={data} />;
    }}
  />
);

export default BoxTableContainer;
