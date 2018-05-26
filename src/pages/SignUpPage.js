import React from "react";
import { Link, withRouter } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Page from "../components/Page";

const SignUpPage = ({ history }) => (
  <Page>
    <Grid container spacing={24} justify="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Typography variant="display1">Sign Up</Typography>
        <SignUpForm onSuccess={user => history.push("/")} />
        <br />
        <Typography variant="body1">
          <Link to="/signin">Already have an account?</Link>
        </Typography>
      </Grid>
    </Grid>
  </Page>
);

export default withRouter(SignUpPage);
