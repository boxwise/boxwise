import React from "react";
import AppFrame from "../components/AppFrame";
import Page from "../components/Page";
import Paper from "@material-ui/core/Paper";
import BoxTableContainer from "../components/BoxTableContainer";

class BoxesPage extends React.Component {
  render() {
    return (
      <AppFrame title="Boxes">
        <Page>
          <Paper>
            <BoxTableContainer />
          </Paper>
        </Page>
      </AppFrame>
    );
  }
}

export default BoxesPage;
