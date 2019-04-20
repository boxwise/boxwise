import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

import { useMaterialUIForm } from "../hooks/forms";

import ButtonWithProgress from "./ButtonWithProgress";

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

const SignInForm = ({ classes, serverError, loading, userSignIn }) => {
  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email address is required.";
    }
    if (!values.password) {
      errors.password = "Password is required.";
    }
    return errors;
  };
  const { handleSubmit, attachValidation } = useMaterialUIForm(
    userSignIn,
    validate
  );

  return (
    <form onSubmit={handleSubmit}>
      {serverError ? (
        <FormHelperText error={true}>{serverError.message}</FormHelperText>
      ) : null}
      <TextField
        id="email"
        type="email"
        label="Email address"
        name="email"
        autoComplete="email"
        fullWidth
        margin="normal"
        {...attachValidation("email")}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        name="password"
        fullWidth
        margin="normal"
        {...attachValidation("password")}
      />
      <ButtonWithProgress
        variant="contained"
        color="primary"
        type="submit"
        loading={loading || false}
        className={classes.submit}
      >
        Sign In
      </ButtonWithProgress>
    </form>
  );
};

export default withStyles(styles)(SignInForm);
