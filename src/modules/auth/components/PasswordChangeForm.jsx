import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { useMaterialUIForm } from "hooks/forms";
import SubmitButton from "components/SubmitButton";
import FormErrorText from "components/FormErrorText";

const PasswordChangeForm = ({ user, userPasswordChange }) => {
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
    }
    if (values.newPassword !== values.confirmedPassword) {
      errors.confirmedPassword =
        "The confirmed password is different from the new password.";
    } else if (values.newPassword.length < 6) {
      errors.newPassword = "Password should be at least 6 characters.";
    }
    return errors;
  };
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const { attachValidation, handleSubmit } = useMaterialUIForm(values => {
    userPasswordChange(values).then(() => setHasSubmittedForm(true));
  }, handleValidation);

  return (
    <form onSubmit={handleSubmit}>
      {hasSubmittedForm && !user.error ? (
        <Typography color="primary">
          Your password has been updated successfully.
        </Typography>
      ) : null}
      <FormErrorText message={user.error && user.error.message} />
      <TextField
        type="password"
        label="Current Password"
        name="currentPassword"
        fullWidth
        margin="normal"
        {...attachValidation("currentPassword")}
      />
      <TextField
        type="password"
        label="New Password"
        name="newPassword"
        fullWidth
        margin="normal"
        {...attachValidation("newPassword")}
      />
      <TextField
        type="password"
        label="Confirm Password"
        name="confirmedPassword"
        fullWidth
        margin="normal"
        {...attachValidation("confirmedPassword")}
      />
      <SubmitButton isSubmitting={user.isUpdating}>
        Update Password
      </SubmitButton>
    </form>
  );
};

export default PasswordChangeForm;
