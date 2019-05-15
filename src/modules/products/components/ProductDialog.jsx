import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Slide from "@material-ui/core/Slide";

import { useMaterialUIForm } from "hooks/forms";
import DialogToolbar from "components/DialogToolbar";
import FormErrorText from "components/FormErrorText";
import SelectField from "components/SelectField";
import TextField from "components/TextField";

import { CATEGORIES } from "../categories";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ProductDialog = ({
  open,
  onClose,
  productToEdit,
  onSubmit,
  isSubmitting,
  serverErrorMessage
}) => {
  const handleValidation = values => {
    const errors = {};
    if (!values.category) {
      errors.category = "Select a category.";
    }
    if (!values.name) {
      errors.name = "Enter a name.";
    }
    return errors;
  };
  const { attachValidation, handleSubmit } = useMaterialUIForm(
    onSubmit,
    handleValidation,
    productToEdit
  );
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      TransitionComponent={Transition}
    >
      <form onSubmit={handleSubmit} data-testid="productDialog">
        <DialogToolbar
          title={productToEdit ? "Edit Product" : "Add Product"}
          onClose={onClose}
          buttonText="Done"
          buttonIsLoading={isSubmitting}
          buttonDataTestId="submitCreateProduct"
          onClickButton={handleSubmit}
        />
        <DialogContent>
          <FormErrorText message={serverErrorMessage} />
          <SelectField
            label="Category"
            name="category"
            dataTestId="selectCategory"
            items={CATEGORIES}
            itemToText={item => item}
            itemToId={item => item}
            {...attachValidation("category")}
          />
          <TextField
            label="Name"
            name="name"
            helperText="Enter a name, like “T-Shirt” or “Socks”. Don’t reuse the category
            name here."
            dataTestId="productName"
            {...attachValidation("name")}
          />
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default withMobileDialog()(ProductDialog);
