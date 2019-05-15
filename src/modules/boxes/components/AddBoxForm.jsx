import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import DialogToolbar from "components/DialogToolbar";
import FormErrorText from "components/FormErrorText";
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
            <TextField
              label="Product"
              name="productId"
              select
              fullWidth
              autoFocus
              margin="dense"
              data-testid="selectProduct"
              {...attachValidation("productId")}
            >
              {products.map(({ id, name, category }) => (
                <MenuItem key={id} value={id} data-testid="productDropdownItem">
                  {category} / {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Number of items"
              name="quantity"
              type="number"
              fullWidth
              margin="dense"
              inputProps={{ pattern: "[0-9]*", inputMode: "numeric" }}
              {...attachValidation("quantity")}
              data-testid="quantity"
            />
            <TextField
              label="Comments"
              name="comment"
              multiline
              rows="4"
              fullWidth
              margin="dense"
              {...attachValidation("comment")}
              data-testid="comment"
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
