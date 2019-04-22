import React from "react";
import TextField from "@material-ui/core/TextField";

import { useMaterialUIForm } from "hooks/forms";
import FormErrorText from "components/FormErrorText";
import SubmitButton from "components/SubmitButton";

// do we use redux or just call firebase directly? via actions?
const ResetPasswordForm = ({ isSubmitting, serverError, resetPassword }) => {
  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = "Enter your email.";
    }
    return errors;
  };
  const { attachValidation, handleSubmit } = useMaterialUIForm(
    resetPassword,
    validate
  );
  return (
    <form onSubmit={handleSubmit}>
      <FormErrorText message={serverError} />
      <TextField
        type="email"
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        {...attachValidation("email")}
      />
      <SubmitButton isSubmitting={isSubmitting}>Reset Password</SubmitButton>
    </form>
  );
};

export default ResetPasswordForm;
