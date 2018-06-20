import React from "react";
import { Link, Redirect } from "react-router-dom";
import ResetPasswordForm from "../containers/components/ResetPasswordForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Page from "../components/Page";

const ResetPasswordPage = ({ history, user }) =>
  !user.hasTriggeredReset ? (
    <Page>
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <Typography variant="display1">Reset Password</Typography>
          <br />
          <Typography variant="body1">
            Enter the email address you signed up with, and we’ll send you a
            link to reset your password.
          </Typography>
          <ResetPasswordForm />
          <br />
          <Typography variant="body1">
            Remember your password? <Link to="/signin">Sign In!</Link>
          </Typography>
        </Grid>
      </Grid>
    </Page>
  ) : (
    <Redirect to="/signin" />
  );

export default ResetPasswordPage;
