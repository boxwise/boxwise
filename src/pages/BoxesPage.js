import React from "react";

import AppFrame from "../components/AppFrame";
import BoxListContainer from "../components/BoxListContainer";

class BoxesPage extends React.Component {
  render() {
    return (
      <AppFrame title="Find boxes">
        <BoxListContainer />
      </AppFrame>
    );
  }
}

export default BoxesPage;
