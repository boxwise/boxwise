import React from "react";
import { compose } from "redux";
import { Formik } from "formik";
import { withFirebase } from "react-redux-firebase";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
    onSubmit={(values, { setSubmitting, setErrors }) => {
      firebase
        .createUser({ email: values.email, password: values.password })
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
    render={({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    }) => (
      <form onSubmit={handleSubmit}>
        {/* TODO: style errors */}
        {errors.form ? (
          <Typography variant="body1">{errors.form}</Typography>
        ) : null}
        <TextField
          error={touched.email && !!errors.email}
          type="email"
          name="email"
          label="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          helperText={touched.email && errors.email}
          fullWidth
          margin="normal"
        />
        <TextField
          error={touched.password && !!errors.password}
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          helperText={touched.password && errors.password}
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

export default compose(withStyles(styles), withFirebase)(SignUpForm);
