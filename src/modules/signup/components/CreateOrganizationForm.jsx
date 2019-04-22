import React from "react";
import { Formik, Field } from "formik";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "formik-material-ui";

import ButtonWithProgress from "components/ButtonWithProgress";
import FormErrorText from "components/FormErrorText";

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

const CreateOrganizationForm = ({ classes, onSubmit }) => (
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
        <ButtonWithProgress
          variant="contained"
          color="primary"
          type="submit"
          loading={isSubmitting}
          className={classes.submit}
        >
          Continue
        </ButtonWithProgress>
      </form>
    )}
  />
);

export default withStyles(styles)(CreateOrganizationForm);
