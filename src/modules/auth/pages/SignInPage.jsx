import React from "react";
import { Link, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { Page } from "modules/layout/components";

import SignInForm from "../containers/SignInForm";

const SignInPage = ({ user }) =>
  !user.data ? (
    <Page>
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h4">Sign In</Typography>
          {user.hasTriggeredReset && (
            <Typography color="primary">
              <br />
              Your password reset email has been sent. Once you reset your
              password, continue with the login below.
            </Typography>
          )}
          <SignInForm />
          <br />
          <Typography>
            <Link to="/reset-password">Forgot your password?</Link>
          </Typography>
          <br />
          <Typography>
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
