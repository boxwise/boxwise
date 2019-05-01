import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Slide from "@material-ui/core/Slide";

import { useMaterialUIForm } from "hooks/forms";
import DialogToolbar from "components/DialogToolbar";
import FormErrorText from "components/FormErrorText";

import { CATEGORIES } from "../categories";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ProductDialog = ({
  open,
  onClose,
  initialValue,
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
    initialValue
  );
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      TransitionComponent={Transition}
    >
      <form onSubmit={handleSubmit}>
        <DialogToolbar
          title={initialValue ? "Edit Product" : "Add Product"}
          onClose={onClose}
          buttonText="Done"
          buttonIsLoading={isSubmitting}
          onClickButton={handleSubmit}
        />
        <DialogContent>
          <FormErrorText message={serverErrorMessage} />
          <TextField
            label="Category"
            name="category"
            select
            fullWidth
            margin="dense"
            data-cy="select-category"
            {...attachValidation("category")}
          >
            {CATEGORIES.map(category => (
              <MenuItem key={category} id="category" value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="dense"
            helperText="Enter a name, like “T-Shirt” or “Socks”. Don’t reuse the category
            name here."
            {...attachValidation("name")}
          />
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default withMobileDialog()(ProductDialog);
