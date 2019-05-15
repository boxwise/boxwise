import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

import SelectField from "components/SelectField";
import DialogToolbar from "components/DialogToolbar";
import FormErrorText from "components/FormErrorText";
import TextField from "components/TextField";
import NumberField from "components/NumberField";
import { useMaterialUIForm } from "hooks/forms";

const AddBoxForm = ({ onClose, onSubmit, products, serverError }) => {
  const handleValidation = values => {
    const errors = {};
    if (!values.productId) {
      errors.productId = "Select a product.";
    }
    if (!values.quantity) {
      errors.quantity = "Enter the number of items in the box.";
    }
    return errors;
  };

  const { attachValidation, handleSubmit, isSubmitting } = useMaterialUIForm(
    onSubmit,
    handleValidation
  );
  return (
    <form onSubmit={handleSubmit} data-testid="boxForm">
      <DialogToolbar
        title="New box"
        onClose={onClose}
        buttonText={products.length ? "Create" : "Cancel"}
        buttonIsLoading={isSubmitting}
        buttonDataTestId="submitCreateBox"
        onClickButton={products.length ? handleSubmit : onClose}
      />
      <DialogContent>
        <FormErrorText message={serverError} />
        {products.length ? (
          <div>
            <SelectField
              label="Product"
              name="productId"
              autoFocus
              dataTestId="selectProduct"
              items={products}
              itemToId={({ id }) => id}
              itemToText={({ category, name }) => `${category} / ${name}`}
              {...attachValidation("productId")}
            />
            <NumberField
              label="Number of items"
              name="quantity"
              dataTestId="quantity"
              {...attachValidation("quantity")}
            />
            <TextField
              label="Comments"
              name="comment"
              multiline
              rows="4"
              dataTestId="comment"
              {...attachValidation("comment")}
            />
          </div>
        ) : (
          <div>
            <Typography variant="h5" paragraph>
              You must add products before you can create a box
            </Typography>
            <Button
              variant="contained"
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
  );
};

export default AddBoxForm;
