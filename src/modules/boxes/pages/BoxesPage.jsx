import React from "react";

import { AppFrame } from "modules/layout/components";

import BoxListContainer from "../containers/BoxListContainer";

const BoxesPage = () => (
  <AppFrame title="Find boxes">
    <BoxListContainer />
  </AppFrame>
);

export default BoxesPage;
