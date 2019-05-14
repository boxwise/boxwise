import React from "react";

import { useMaterialUIForm } from "hooks/forms";
import FormErrorText from "components/FormErrorText";
import SubmitButton from "components/SubmitButton";
import EmailField from "components/EmailField";

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
      <EmailField
        label="Email"
        name="email"
        dataTestId="email"
        {...attachValidation("email")}
      />
      <SubmitButton
        dataTestId="resetPasswordButton"
        isSubmitting={isSubmitting}
      >
        Reset Password
      </SubmitButton>
    </form>
  );
};

export default ResetPasswordForm;
