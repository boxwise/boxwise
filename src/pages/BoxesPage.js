import React from "react";
import AppFrame from "../components/AppFrame";
import Page from "../components/Page";
import BoxTableContainer from "../components/BoxTableContainer";

const BoxesPage = () => (
  <AppFrame title="Boxes">
    <Page>
      <BoxTableContainer />
    </Page>
  </AppFrame>
);

export default BoxesPage;
