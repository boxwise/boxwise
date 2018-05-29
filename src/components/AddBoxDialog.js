import React from "react";
import { Formik, Field } from "formik";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import TextField from "../vendor/formik-material-ui/TextField";

const AddBoxDialog = ({ open, onClose, onSubmit }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="form-dialog-title"
    fullWidth
  >
    <DialogTitle id="form-dialog-title">Add Product</DialogTitle>

    <Formik
      initialValues={{
        number: "",
        product: "",
        count: "",
        status: ""
      }}
      validate={values => {
        let errors = {};
        return errors;
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, isSubmitting, errors }) => (
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* TODO: style errors */}
            {errors.form ? (
              <Typography variant="body1">{errors.form}</Typography>
            ) : null}
            <Field
              label="Number"
              name="number"
              component={TextField}
              fullWidth
              autoFocus
              margin="dense"
            />
            <Field
              label="Product"
              name="product"
              component={TextField}
              fullWidth
              margin="dense"
            />
            <Field
              label="Count"
              name="count"
              component={TextField}
              fullWidth
              margin="dense"
            />
            <Field
              label="Status"
              name="status"
              component={TextField}
              fullWidth
              margin="dense"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="raised"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Add
            </Button>
          </DialogActions>
        </form>
      )}
    />
  </Dialog>
);

export default AddBoxDialog;
