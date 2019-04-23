import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { Page } from "modules/layout/components";
import AppBarHeader from "components/AppBarHeader";

import CreateOrganizationFlow from "../components/CreateOrganizationFlow";

export const CreateOrganizationPage = ({ history }) => (
  <React.Fragment>
    <AppBarHeader backUrl="/signin" title="Set up Boxwise" />
    <Page>
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <br />
          <br />
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
