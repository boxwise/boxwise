import React from "react";
import { Field, Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";

import FormErrorText from "components/FormErrorText";
import ButtonWithProgress from "components/ButtonWithProgress";

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
      const errors = {};
      if (!values.email) {
        errors.email = "Enter your email.";
      }
      return errors;
    }}
    onSubmit={resetPassword}
    render={({ handleSubmit, isSubmitting, errors }) => (
      <form onSubmit={handleSubmit}>
        <FormErrorText message={errors.form} />
        <Field
          type="email"
          label="Email"
          name="email"
          component={TextField}
          fullWidth
          margin="normal"
        />
        <ButtonWithProgress
          variant="contained"
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
