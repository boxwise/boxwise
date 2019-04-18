import React from "react";
import { connect } from "react-redux";
import { resetPassword } from "../../auth";
import { Field, Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";
import Typography from "@material-ui/core/Typography";
import ButtonWithProgress from "../../../components/ButtonWithProgress";

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
        {errors.form ? <Typography>{errors.form}</Typography> : null}
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

export const StyledResetPasswordForm = withStyles(styles)(ResetPasswordForm);

const mapState = ({ user: { loading } }) => ({ loading });

export default connect(
  mapState,
  { resetPassword }
)(StyledResetPasswordForm);
