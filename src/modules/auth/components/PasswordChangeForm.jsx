import React from "react";
import Typography from "@material-ui/core/Typography";

import { useMaterialUIForm } from "hooks/forms";
import SubmitButton from "components/SubmitButton";
import FormErrorText from "components/FormErrorText";
import PasswordField from "components/PasswordField";

export const PasswordChangeForm = ({ serverError, userPasswordChange }) => {
  const handleValidation = values => {
    const errors = {};
    if (!values.currentPassword) {
      errors.currentPassword = "Enter your current password.";
    }
    if (!values.newPassword) {
      errors.newPassword = "Enter your new password.";
    }
    if (!values.confirmedPassword) {
      errors.confirmedPassword = "Please confirm your new password.";
    } else if (values.newPassword !== values.confirmedPassword) {
      errors.confirmedPassword =
        "The confirmed password is different from the new password.";
    } else if (values.newPassword.length < 6) {
      errors.newPassword = "Password should be at least 6 characters.";
    }
    return errors;
  };
  const {
    attachValidation,
    handleSubmit,
    isSubmitting,
    hasSubmittedSuccess
  } = useMaterialUIForm(userPasswordChange, handleValidation);
  return (
    <form onSubmit={handleSubmit}>
      {hasSubmittedSuccess ? (
        <Typography color="primary" data-testid="pwdChangeConfirmation">
          Your password has been updated successfully.
        </Typography>
      ) : null}
      <FormErrorText message={serverError} />
      <PasswordField
        name="currentPassword"
        label="Current Password"
        dataTestId="currentPassword"
        {...attachValidation("currentPassword")}
      />
      <PasswordField
        name="newPassword"
        label="New Password"
        dataTestId="newPassword"
        {...attachValidation("newPassword")}
      />
      <PasswordField
        name="confirmedPassword"
        label="Confirm Password"
        dataTestId="confirmedPassword"
        {...attachValidation("confirmedPassword")}
      />
      <SubmitButton
        isSubmitting={isSubmitting}
        data-testid="updatePasswordButton"
      >
        Update Password
      </SubmitButton>
    </form>
  );
};

export default PasswordChangeForm;
