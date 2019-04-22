import React from "react";
import { Field, Formik } from "formik";
import { TextField } from "formik-material-ui";

import FormErrorText from "components/FormErrorText";
import SubmitButton from "components/SubmitButton";

const ResetPasswordForm = ({ loading, resetPassword }) => (
  <Formik
    initialValues={{
      email: ""
    }}
    validate={values => {
      const errors = {};
      if (!values.email) {
        errors.email = "Enter your email.";
      }
      return errors;
    }}
    onSubmit={resetPassword}
    render={({ handleSubmit, isSubmitting, errors }) => (
      <form onSubmit={handleSubmit}>
        <FormErrorText message={errors.form} />
        <Field
          type="email"
          label="Email"
          name="email"
          component={TextField}
          fullWidth
          margin="normal"
        />
        <SubmitButton isSubmitting={isSubmitting || loading}>
          Reset Password
        </SubmitButton>
      </form>
    )}
  />
);

export default ResetPasswordForm;
