import React from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "../vendor/formik-material-ui/TextField";
import Typography from "@material-ui/core/Typography";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Slide from "@material-ui/core/Slide";
import DialogToolbar from "./DialogToolbar";

const styles = theme => ({
  root: {}
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const AddProductDialog = ({
  classes,
  firestore,
  open,
  fullScreen,
  onClose,
  onSubmit
}) => (
  <Dialog
    className={classes.root}
    open={open}
    onClose={onClose}
    aria-labelledby="form-dialog-title"
    fullWidth
    fullScreen={fullScreen}
    TransitionComponent={Transition}
  >
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
          <DialogToolbar
            title="Add Product"
            onClose={onClose}
            buttonText="Done"
            buttonIsLoading={isSubmitting}
            onClickButton={handleSubmit}
          />
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
          </DialogContent>
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
  withMobileDialog()
)(AddProductDialog);
