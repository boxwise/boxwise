import React from "react";
import AppFrame from "../components/AppFrame";
import Page from "../components/Page";
import AddBoxDialogContainer from "../components/AddBoxDialogContainer";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import BoxTableContainer from "../components/BoxTableContainer";

class BoxesPage extends React.Component {
  state = {
    addDialogOpen: false
  };

  render() {
    return (
      <AppFrame title="Boxes">
        <Page>
          <Paper>
            <AddBoxDialogContainer
              open={this.state.addDialogOpen}
              onClose={() => this.setState({ addDialogOpen: false })}
            />
            <Toolbar>
              <Button
                color="primary"
                onClick={() => this.setState({ addDialogOpen: true })}
              >
                Add Box
              </Button>
            </Toolbar>
            <BoxTableContainer />
          </Paper>
        </Page>
      </AppFrame>
    );
  }
}

export default BoxesPage;
