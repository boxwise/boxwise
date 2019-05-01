import React from "react";
import TextField from "@material-ui/core/TextField";

import { useMaterialUIForm } from "hooks/forms";
import FormErrorText from "components/FormErrorText";
import SubmitButton from "components/SubmitButton";

const SignUpForm = ({
  onSubmit,
  serverError,
  submitButtonText = "Sign up"
}) => {
  const handleValidation = values => {
    const errors = {};
    if (!values.name) {
      errors.name = "Enter your name.";
    }
    if (!values.email) {
      errors.email = "Enter your email.";
    }
    if (!values.password) {
      errors.password = "Enter a password.";
    }
    return errors;
  };
  const { attachValidation, handleSubmit, isSubmitting } = useMaterialUIForm(
    onSubmit,
    handleValidation
  );
  return (
    <form onSubmit={handleSubmit}>
      <FormErrorText message={serverError} />
      <TextField
        type="name"
        label="Enter your name"
        name="name"
        fullWidth
        margin="normal"
        {...attachValidation("name")}
      />
      <TextField
        type="email"
        label="What is your email?"
        name="email"
        fullWidth
        margin="normal"
        {...attachValidation("email")}
      />
      <TextField
        type="password"
        label="Choose a password"
        name="password"
        fullWidth
        margin="normal"
        {...attachValidation("password")}
      />
      <SubmitButton 
        data-cy="createUserButton"
        isSubmitting={isSubmitting}
      >
        {submitButtonText}
      </SubmitButton>
    </form>
  );
};

export default SignUpForm;
