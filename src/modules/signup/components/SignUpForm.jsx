import React from "react";
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";

import FormErrorText from "components/FormErrorText";
import SubmitButton from "components/SubmitButton";

const SignUpForm = ({ onSubmit, submitButtonText = "Sign up" }) => (
  <Formik
    initialValues={{
      name: "",
      email: "",
      password: ""
    }}
    validate={values => {
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
    }}
    onSubmit={onSubmit}
    render={({ handleSubmit, isSubmitting, errors }) => (
      <form onSubmit={handleSubmit}>
        <FormErrorText message={errors.form} />
        <Field
          type="name"
          label="Enter your name"
          name="name"
          component={TextField}
          fullWidth
          margin="normal"
        />
        <Field
          type="email"
          label="What is your email?"
          name="email"
          component={TextField}
          fullWidth
          margin="normal"
        />
        <Field
          type="password"
          label="Choose a password"
          name="password"
          component={TextField}
          fullWidth
          margin="normal"
        />
        <SubmitButton isSubmitting={isSubmitting}>
          {submitButtonText}
        </SubmitButton>
      </form>
    )}
  />
);

export default SignUpForm;
