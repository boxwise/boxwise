import React from "react";

import { useMaterialUIForm } from "hooks/forms";
import FormErrorText from "components/FormErrorText";
import TextField from "components/TextField";
import PasswordField from "components/PasswordField";
import EmailField from "components/EmailField";
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
        label="Enter your name"
        name="name"
        dataTestId="name"
        {...attachValidation("name")}
      />
      <EmailField
        label="What is your email?"
        name="email"
        dataTestId="email"
        {...attachValidation("email")}
      />
      <PasswordField
        label="Choose a password"
        name="password"
        dataTestId="password"
        {...attachValidation("password")}
      />
      <SubmitButton dataTestId="createUserButton" isSubmitting={isSubmitting}>
        {submitButtonText}
      </SubmitButton>
    </form>
  );
};

export default SignUpForm;
