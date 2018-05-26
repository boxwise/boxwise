import React from "react";
import { Formik, Field } from "formik";
import { withFirebase } from "react-redux-firebase";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "../vendor/formik-material-ui/TextField";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

const SignUpForm = ({ firebase, classes, onSuccess }) => (
  <Formik
    initialValues={{
      email: "",
      password: ""
    }}
    validate={values => {
      let errors = {};
      if (!values.email) {
        errors.email = "Enter your email.";
      }
      if (!values.password) {
        errors.password = "Enter your password.";
      }
      return errors;
    }}
    onSubmit={({ email, password }, { setSubmitting, setErrors }) => {
      firebase
        .createUser({ email, password })
        .then(user => {
          setSubmitting(false);
          onSuccess(user);
        })
        .catch(error => {
          setSubmitting(false);
          console.error(error);
          setErrors({ form: error.message });
        });
    }}
    render={({ handleSubmit, isSubmitting, errors }) => (
      <form onSubmit={handleSubmit}>
        {/* TODO: style errors */}
        {errors.form ? (
          <Typography variant="body1">{errors.form}</Typography>
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
        <Button
          variant="raised"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    )}
  />
);

// For testing
export const SignUpFormUnconnected = withStyles(styles)(SignUpForm);

export default withFirebase(SignUpFormUnconnected);
