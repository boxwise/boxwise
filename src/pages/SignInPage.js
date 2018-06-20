import React from "react";
import { Link, Redirect } from "react-router-dom";
import SignInForm from "../containers/components/SignInForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Page from "../components/Page";

const SignInPage = ({ history, user }) =>
  !user.data ? (
    <Page>
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <Typography variant="display1">Sign In</Typography>
          {user.hasTriggeredReset && (
            <Typography variant="body1">
              <br />
              Your password reset email has been sent. Once you reset your
              password, continue with the login below.
            </Typography>
          )}
          <SignInForm />
          <br />
          <Typography variant="body1">
            <Link to="/reset-password">Forgot your password?</Link>
          </Typography>
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
  ) : (
    <Redirect to="/" />
  );

export default SignInPage;
