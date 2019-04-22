import React from "react";
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";

import SubmitButton from "components/SubmitButton";
import FormErrorText from "components/FormErrorText";

const CreateOrganizationForm = ({ onSubmit }) => (
  <Formik
    initialValues={{
      name: ""
    }}
    validate={values => {
      const errors = {};
      if (!values.name) {
        errors.name = "Enter a name.";
      }
      return errors;
    }}
    onSubmit={onSubmit}
    render={({ handleSubmit, isSubmitting, errors }) => (
      <form onSubmit={handleSubmit}>
        <FormErrorText message={errors.form} />
        <Field
          type="text"
          label="What’s the name of your organization?"
          name="name"
          component={TextField}
          fullWidth
          margin="normal"
        />
        <SubmitButton isSubmitting={isSubmitting}>Continue</SubmitButton>
      </form>
    )}
  />
);

export default CreateOrganizationForm;
