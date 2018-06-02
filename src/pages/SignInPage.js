import React from "react";
import { Link, withRouter } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Page from "../components/Page";

const SignInPage = ({ history }) => (
  <Page>
    <Grid container spacing={24} justify="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Typography variant="display1">Sign In</Typography>
        {/* setTimeout because we need to let AuthedRoute update */}
        <SignInForm onSuccess={user => setTimeout(() => history.push("/"))} />
        <br />
        <Typography variant="body1">
          Don’t have an account?{" "}
          <Link to="/create-organization">
            Set up your organization with Boxwise
          </Link>
        </Typography>
      </Grid>
    </Grid>
  </Page>
);

export default withRouter(SignInPage);
