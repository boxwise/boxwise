import React from "react";
import { Link, withRouter } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Page from "../components/Page";
import { createUserAndProfile } from "../auth";

const SignUpPage = ({ history }) => (
  <Page>
    <Grid container spacing={24} justify="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Typography variant="display1">Sign Up</Typography>
        <SignUpForm
          onSuccess={({ email, password }, { setSubmitting, setErrors }) => {
            createUserAndProfile({ email, password })
              .then(user => {
                setSubmitting(false);
                /* setTimeout because we need to let AuthedRoute update */
                setTimeout(() => history.push("/"));
              })
              .catch(error => {
                setSubmitting(false);
                console.error(error);
                setErrors({ form: error.message });
              });
          }}
        />
        <br />
        <Typography variant="body1">
          <Link to="/signin">Already have an account?</Link>
        </Typography>
      </Grid>
    </Grid>
  </Page>
);

export default withRouter(SignUpPage);
