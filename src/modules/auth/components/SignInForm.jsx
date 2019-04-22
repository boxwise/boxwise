import React from "react";
import TextField from "@material-ui/core/TextField";

import { useMaterialUIForm } from "hooks/forms";
import SubmitButton from "components/SubmitButton";
import FormErrorText from "components/FormErrorText";

const SignInForm = ({ serverError, loading, userSignIn }) => {
  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email address is required.";
    }
    if (!values.password) {
      errors.password = "Password is required.";
    }
    return errors;
  };
  const { attachValidation, handleSubmit } = useMaterialUIForm(
    userSignIn,
    validate
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormErrorText message={serverError && serverError.message} />
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
      <SubmitButton isSubmitting={loading || false}>Sign In</SubmitButton>
    </form>
  );
};

export default SignInForm;
