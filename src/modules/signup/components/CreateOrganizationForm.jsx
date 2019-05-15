import React from "react";

import TextField from "components/TextField";
import SubmitButton from "components/SubmitButton";
import { useMaterialUIForm } from "hooks/forms";

const CreateOrganizationForm = ({ onSubmit }) => {
  const handleValidation = values => {
    const errors = {};
    if (!values.name) {
      errors.name = "Enter a name.";
    }
    return errors;
  };
  const { attachValidation, handleSubmit, isSubmitting } = useMaterialUIForm(
    onSubmit,
    handleValidation
  );
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        dataTestId="orgNameInput"
        label="What’s the name of your organization?"
        name="name"
        {...attachValidation("name")}
      />
      <SubmitButton isSubmitting={isSubmitting}>Continue</SubmitButton>
    </form>
  );
};

export default CreateOrganizationForm;
