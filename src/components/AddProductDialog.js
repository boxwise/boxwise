import React from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { withFirestore } from "react-redux-firebase";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "../vendor/formik-material-ui/TextField";
import Typography from "@material-ui/core/Typography";
import withMobileDialog from "@material-ui/core/withMobileDialog";

const styles = theme => ({
  root: {}
});

const AddProductDialog = ({
  classes,
  firestore,
  open,
  fullScreen,
  onClose
}) => (
  <Dialog
    className={classes.root}
    open={open}
    onClose={onClose}
    aria-labelledby="form-dialog-title"
    fullWidth
    fullScreen={fullScreen}
  >
    <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
    <Formik
      initialValues={{
        name: "",
        description: "",
        price: ""
      }}
      validate={values => {
        let errors = {};
        if (!values.name) {
          errors.name = "Enter a name.";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        firestore
          .add("products", values)
          .then(onClose)
          .catch(err => setErrors({ form: err.message }));
      }}
      render={({ handleSubmit, isSubmitting, errors }) => (
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* TODO: style errors */}
            {errors.form ? (
              <Typography variant="body1">{errors.form}</Typography>
            ) : null}
            <Field
              label="Name"
              name="name"
              component={TextField}
              fullWidth
              autoFocus
              margin="dense"
            />
            <Field
              label="Description"
              name="description"
              component={TextField}
              fullWidth
              margin="dense"
            />
            <Field
              type="number"
              label="Price"
              name="price"
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

AddProductDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired
};

export default compose(
  withStyles(styles),
  withMobileDialog(),
  withFirestore
)(AddProductDialog);
