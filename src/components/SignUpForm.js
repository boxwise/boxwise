import React from "react";
import { Formik, Field } from "formik";
import { withStyles } from "@material-ui/core/styles";
import TextField from "../vendor/formik-material-ui/TextField";
import Typography from "@material-ui/core/Typography";
import ButtonWithProgress from "./ButtonWithProgress";

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

const SignUpForm = ({ classes, onSubmit, submitButtonText }) => (
  <Formik
    initialValues={{
      name: "",
      email: "",
      password: ""
    }}
    validate={values => {
      let errors = {};
      if (!values.name) {
        errors.name = "Enter your name.";
      }
      if (!values.email) {
        errors.email = "Enter your email.";
      }
      if (!values.password) {
        errors.password = "Enter a password.";
      }
      return errors;
    }}
    onSubmit={onSubmit}
    render={({ handleSubmit, isSubmitting, errors }) => (
      <form onSubmit={handleSubmit}>
        {/* TODO: style errors */}
        {errors.form ? (
          <Typography variant="body1">{errors.form}</Typography>
        ) : null}
        <Field
          type="name"
          label="Enter your name"
          name="name"
          component={TextField}
          fullWidth
          margin="normal"
        />
        <Field
          type="email"
          label="What is your email?"
          name="email"
          component={TextField}
          fullWidth
          margin="normal"
        />
        <Field
          type="password"
          label="Choose a password"
          name="password"
          component={TextField}
          fullWidth
          margin="normal"
        />
        <ButtonWithProgress
          variant="raised"
          color="primary"
          type="submit"
          loading={isSubmitting}
          className={classes.submit}
        >
          {submitButtonText}
        </ButtonWithProgress>
      </form>
    )}
  />
);

SignUpForm.defaultProps = {
  submitButtonText: "Sign Up"
};

export default withStyles(styles)(SignUpForm);
