import React from "react";
import { Field, Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import Typography from "@material-ui/core/Typography";
import ButtonWithProgress from "./ButtonWithProgress";

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

const SignInForm = ({ classes, error, loading, userSignIn }) => (
  <Formik
    initialValues={{
      email: "",
      password: ""
    }}
    validate={({ email, password }) => {
      let errors = {};
      if (!email) {
        errors.email = "Enter your email.";
      }
      if (!password) {
        errors.password = "Enter your password.";
      }
      return errors;
    }}
    onSubmit={userSignIn}
    render={({ handleSubmit, errors }) => (
      <form onSubmit={handleSubmit}>
        {error ? (
          <Typography color="error" variant="body1">
            {error.message}
          </Typography>
        ) : null}
        {errors.form ? (
          <Typography color="error" variant="body1">
            {errors.form}
          </Typography>
        ) : null}
        <Field
          type="email"
          label="Email"
          name="email"
          component={TextField}
          fullWidth
          margin="normal"
        />
        <Field
          type="password"
          label="Password"
          name="password"
          component={TextField}
          fullWidth
          margin="normal"
        />
        <ButtonWithProgress
          variant="raised"
          color="primary"
          type="submit"
          loading={loading}
          className={classes.submit}
        >
          Sign In
        </ButtonWithProgress>
      </form>
    )}
  />
);

export default withStyles(styles)(SignInForm);
