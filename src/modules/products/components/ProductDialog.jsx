import React from "react";
import { Formik, Field } from "formik";
import { compose } from "redux";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "formik-material-ui";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Slide from "@material-ui/core/Slide";

import DialogToolbar from "components/DialogToolbar";
import FormErrorText from "components/FormErrorText";

import { CATEGORIES } from "../categories";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ProductDialog = ({
  open,
  fullScreen,
  onClose,
  initialValue,
  onSubmit
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="form-dialog-title"
    fullWidth
    fullScreen={fullScreen}
    TransitionComponent={Transition}
  >
    <Formik
      initialValues={initialValue || { category: "" }}
      validate={values => {
        const errors = {};
        if (!values.category) {
          errors.category = "Select a category.";
        }
        if (!values.name) {
          errors.name = "Enter a name.";
        }
        return errors;
      }}
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        handleChange,
        isSubmitting,
        values,
        errors
      }) => (
        <form onSubmit={handleSubmit}>
          <DialogToolbar
            title="Add Product"
            onClose={onClose}
            buttonText="Done"
            buttonIsLoading={isSubmitting}
            onClickButton={handleSubmit}
          />
          <DialogContent>
            <FormErrorText message={errors.form} />
            <Field
              label="Category"
              name="category"
              component={TextField}
              select
              value={values.category}
              onChange={handleChange}
              fullWidth
              margin="dense"
            >
              {CATEGORIES.map(category => (
                <MenuItem key={category} id="category" value={category}>
                  {category}
                </MenuItem>
              ))}
            </Field>
            <Field
              label="Name"
              name="name"
              component={TextField}
              fullWidth
              margin="dense"
              helperText="Enter a name, like “T-Shirt” or “Socks”. Don’t reuse the category
              name here."
            />
          </DialogContent>
        </form>
      )}
    />
  </Dialog>
);

export default compose(withMobileDialog())(ProductDialog);
