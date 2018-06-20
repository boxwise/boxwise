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

const ResetPasswordForm = ({ classes, loading, resetPassword }) => (
  <Formik
    initialValues={{
      email: ""
    }}
    validate={values => {
      let errors = {};
      if (!values.email) {
        errors.email = "Enter your email.";
      }
      return errors;
    }}
    onSubmit={resetPassword}
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
        <ButtonWithProgress
          variant="raised"
          color="primary"
          type="submit"
          loading={isSubmitting || loading}
          className={classes.submit}
        >
          Reset Password
        </ButtonWithProgress>
      </form>
    )}
  />
);

export default withStyles(styles)(ResetPasswordForm);
