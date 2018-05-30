import React from "react";
import { Formik, Field } from "formik";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "../vendor/formik-material-ui/TextField";
import Typography from "@material-ui/core/Typography";
import DialogToolbar from "./DialogToolbar";

const AddBoxForm = ({ classes, onClose, onSubmit }) => (
  <Formik
    initialValues={{
      product: "",
      quantity: "",
      comment: ""
    }}
    validate={values => {
      let errors = {};
      if (!values.product) {
        errors.product = "Enter a product";
      }
      if (!values.quantity) {
        errors.quantity = "Enter the number of items.";
      }
      return errors;
    }}
    onSubmit={onSubmit}
    render={({ handleSubmit, isSubmitting, errors }) => (
      <form onSubmit={handleSubmit}>
        <DialogToolbar
          title="New box"
          onClose={onClose}
          buttonText="Create"
          buttonIsLoading={isSubmitting}
          onClickButton={handleSubmit}
        />
        <DialogContent>
          {/* TODO: style errors */}
          {errors.form ? (
            <Typography variant="body1">{errors.form}</Typography>
          ) : null}
          <Field
            label="Product"
            name="product"
            component={TextField}
            fullWidth
            margin="dense"
          />
          <Field
            label="Number of items"
            name="quantity"
            type="number"
            component={TextField}
            fullWidth
            margin="dense"
          />
          <Field
            label="Comments"
            name="comment"
            component={TextField}
            multiline
            rows="4"
            fullWidth
            margin="dense"
          />
        </DialogContent>
      </form>
    )}
  />
);

export default AddBoxForm;
