import React from "react";
import { Formik, Field } from "formik";
import { withStyles } from "@material-ui/core/styles";
import TextField from "../vendor/formik-material-ui/TextField";
import Typography from "@material-ui/core/Typography";
import ButtonWithProgress from "./ButtonWithProgress";

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
      let errors = {};
      if (!values.name) {
        errors.name = "Enter a name.";
      }
      return errors;
    }}
    onSubmit={onSubmit}
    render={({ handleSubmit, isSubmitting, errors }) => (
      <form onSubmit={handleSubmit}>
        {/* TODO: style errors */}
        {errors.form ? (
          <Typography variant="body1">{errors.form}</Typography>
        ) : null}
        <Field
          type="text"
          label="What is the name of your organization?"
          name="name"
          component={TextField}
          fullWidth
          autoFocus
          margin="normal"
        />
        <ButtonWithProgress
          variant="raised"
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
