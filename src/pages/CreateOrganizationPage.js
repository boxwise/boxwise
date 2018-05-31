import React from "react";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Page from "../components/Page";
import CreateOrganizationFlow from "../components/CreateOrganizationFlow";

const CreateOrganizationPage = ({ history }) => (
  <Page>
    <Grid container spacing={24} justify="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Typography variant="display1">Set up Drop App</Typography>
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
);

export default withRouter(CreateOrganizationPage);
