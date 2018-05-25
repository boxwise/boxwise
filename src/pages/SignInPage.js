import React from "react";
import { withRouter } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Page from "../components/Page";

const SignInPage = ({ history }) => (
  <Page>
    <Grid container spacing={24} justify="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Typography variant="display1">Sign In</Typography>
        <SignInForm onSuccess={user => history.push("/")} />
      </Grid>
    </Grid>
  </Page>
);

export default withRouter(SignInPage);
