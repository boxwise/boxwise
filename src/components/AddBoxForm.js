import React from "react";
import { Formik, Field } from "formik";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "../vendor/formik-material-ui/TextField";
import Typography from "@material-ui/core/Typography";
import DialogToolbar from "./DialogToolbar";

const AddBoxForm = ({ classes, onClose, onSubmit, products }) => (
  <Formik
    initialValues={{
      product: "",
      quantity: "",
      comment: ""
    }}
    validate={values => {
      let errors = {};
      if (!values.product) {
        errors.product = "Select a product.";
      }
      if (!values.quantity) {
        errors.quantity = "Enter the number of items in the box";
      }
      return errors;
    }}
    onSubmit={onSubmit}
    render={({ handleSubmit, handleChange, isSubmitting, values, errors }) => (
      <form onSubmit={handleSubmit}>
        <DialogToolbar
          title="New box"
          onClose={onClose}
          buttonText={products.length ? "Create" : "Cancel"}
          buttonIsLoading={isSubmitting}
          onClickButton={products.length ? handleSubmit : onClose}
        />
        <DialogContent>
          {/* TODO: style errors */}
          {errors.form ? (
            <Typography variant="body1">{errors.form}</Typography>
          ) : null}
          {products.length ? (
            <div>
              <Field
                label="Product"
                name="product"
                component={TextField}
                select
                value={values.product}
                onChange={handleChange}
                fullWidth
                autoFocus
                margin="dense"
              >
                {products.map(n => (
                  <MenuItem key={n.id} value={n.id}>
                    {n.category} / {n.name}
                  </MenuItem>
                ))}
              </Field>
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
            </div>
          ) : (
            <div>
              <Typography variant="headline" paragraph={true}>
                You must add products before you can create a box
              </Typography>
              <Button
                variant="raised"
                color="secondary"
                component={Link}
                to="/products"
              >
                Go to Products page
              </Button>
            </div>
          )}
        </DialogContent>
      </form>
    )}
  />
);

export default AddBoxForm;
