import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";

import { Page } from "modules/layout/components";
import AppBarHeader from "components/AppBarHeader";

import CreateOrganizationFlow from "../components/CreateOrganizationFlow";

export const CreateOrganizationPage = ({ history }) => (
  <React.Fragment>
    <AppBarHeader backUrl="/signin" title="Set up Boxwise" />
    <Page>
      <Toolbar />
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <CreateOrganizationFlow
            onDone={() => {
              history.push("/");
            }}
          />
        </Grid>
      </Grid>
    </Page>
  </React.Fragment>
);

export default withRouter(CreateOrganizationPage);
