import React from "react";
import { Link, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import ResetPasswordForm from "../containers/components/ResetPasswordForm";
import Page from "../components/Page";

const ResetPasswordPage = ({ history, user }) =>
  !user.hasTriggeredReset ? (
    <Page>
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h4">Reset Password</Typography>
          <br />
          <Typography>
            Enter the email address you signed up with, and we’ll send you a
            link to reset your password.
          </Typography>
          <ResetPasswordForm />
          <br />
          <Typography>
            Remember your password? <Link to="/signin">Sign In!</Link>
          </Typography>
        </Grid>
      </Grid>
    </Page>
  ) : (
    <Redirect to="/signin" />
  );

export default ResetPasswordPage;
