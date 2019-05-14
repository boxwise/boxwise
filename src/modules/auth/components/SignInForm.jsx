import React from "react";

import { useMaterialUIForm } from "hooks/forms";
import SubmitButton from "components/SubmitButton";
import FormErrorText from "components/FormErrorText";
import PasswordField from "components/PasswordField";
import EmailField from "components/EmailField";

const SignInForm = ({ serverError, userSignIn }) => {
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
  const { attachValidation, handleSubmit, isSubmitting } = useMaterialUIForm(
    userSignIn,
    validate
  );
  return (
    <form onSubmit={handleSubmit}>
      <FormErrorText message={serverError && serverError.message} />
      <EmailField
        label="Email address"
        name="email"
        dataTestId="email"
        {...attachValidation("email")}
      />
      <PasswordField
        label="Password"
        name="password"
        dataTestId="password"
        {...attachValidation("password")}
      />
      <SubmitButton isSubmitting={isSubmitting} dataTestId="signInButton">
        Sign In
      </SubmitButton>
    </form>
  );
};

export default SignInForm;
