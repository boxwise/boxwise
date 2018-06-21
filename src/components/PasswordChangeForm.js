import React from "react";
import { Field, Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import TextField from "../vendor/formik-material-ui/TextField";
import Typography from "@material-ui/core/Typography";
import ButtonWithProgress from "./ButtonWithProgress";
import { handleError } from "../utils";

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

const PasswordChangeForm = ({ classes, user, userPasswordChange }) => (
  <Formik
    initialValues={{
      currentPassword: "",
      newPassword: "",
      confirmedPassword: ""
    }}
    validate={values => {
      let errors = {};
      if (!values.currentPassword) {
        errors.currentPassword = "Enter your current password.";
      }
      if (!values.newPassword) {
        errors.newPassword = "Enter your new password.";
      }
      if (!values.confirmedPassword) {
        errors.confirmedPassword = "Confirmed your new password.";
      }
      if (values.newPassword !== values.confirmedPassword) {
        errors.mismatchedPassword =
          "The confirmed password is different from the new password.";
      } else if (values.newPassword.length < 6) {
        errors.malformedPassword = "Password should be at least 6 characters.";
      }

      return errors;
    }}
    onSubmit={(
      { currentPassword, newPassword },
      { setSubmitting, setErrors, setStatus }
    ) => {
      const email = user.data.email;
      userPasswordChange({ email, currentPassword, newPassword })
        .then(() => {
          setSubmitting(false);
          setStatus(0);
        })
        .catch(error => {
          setSubmitting(false);
          handleError(error);
          setErrors({ form: error.message });
        });
    }}
    render={({ handleSubmit, isSubmitting, errors, touched, status }) => (
      <form onSubmit={handleSubmit}>
        {status === 0 ? (
          <Typography variant="body1" color="primary">
            Your password has been updated successfully.
          </Typography>
        ) : null}

        {/* TODO: style errors */}
        {errors.form ? (
          <Typography variant="body1" color="error">
            {errors.form}
          </Typography>
        ) : null}

        {touched.currentPassword && errors.currentPassword ? (
          <Typography variant="body1" color="error">
            {errors.currentPassword}
          </Typography>
        ) : null}
        <Field
          type="password"
          label="Current Password"
          name="currentPassword"
          component={TextField}
          fullWidth
          margin="normal"
        />
        {touched.newPassword && errors.newPassword ? (
          <Typography variant="body1" color="error">
            {errors.newPassword}
          </Typography>
        ) : null}
        <Field
          type="password"
          label="New Password"
          name="newPassword"
          component={TextField}
          fullWidth
          margin="normal"
        />
        {touched.confirmedPassword && errors.confirmedPassword ? (
          <Typography variant="body1" color="error">
            {errors.confirmedPassword}
          </Typography>
        ) : null}
        <Field
          type="password"
          label="Confirm Password"
          name="confirmedPassword"
          component={TextField}
          fullWidth
          margin="normal"
        />
        {touched.newPassword &&
        touched.confirmedPassword &&
        errors.mismatchedPassword ? (
          <Typography variant="body1" color="error">
            {errors.mismatchedPassword}
          </Typography>
        ) : null}
        {touched.newPassword &&
        touched.confirmedPassword &&
        errors.malformedPassword ? (
          <Typography variant="body1" color="error">
            {errors.malformedPassword}
          </Typography>
        ) : null}
        <ButtonWithProgress
          variant="raised"
          color="primary"
          type="submit"
          loading={isSubmitting || user.isUpdating}
          className={classes.submit}
        >
          Update Password
        </ButtonWithProgress>
      </form>
    )}
  />
);

export default withStyles(styles)(PasswordChangeForm);
