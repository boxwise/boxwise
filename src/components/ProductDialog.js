import React from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
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

const ProductDialog = ({
  classes,
  open,
  fullScreen,
  onClose,
  initialValue,
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
      initialValues={initialValue}
      validate={values => {
        let errors = {};
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
            {/* TODO: style errors */}
            {errors.form ? (
              <Typography variant="body1">{errors.form}</Typography>
            ) : null}
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
              <MenuItem value="Man">Man</MenuItem>
              <MenuItem value="Woman">Woman</MenuItem>
              <MenuItem value="Adult">Adult</MenuItem>
              <MenuItem value="Boy">Boy</MenuItem>
              <MenuItem value="Girl">Girl</MenuItem>
              <MenuItem value="Child">Child</MenuItem>
              <MenuItem value="Baby">Baby</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Hygiene">Hygiene</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
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

ProductDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired
};

export default compose(
  withStyles(styles),
  withMobileDialog()
)(ProductDialog);
