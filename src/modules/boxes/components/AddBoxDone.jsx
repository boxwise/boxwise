import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import DialogToolbar from "components/DialogToolbar";

const AddBoxDone = ({ box, selectedProduct, onClose, onReset }) => (
  <div>
    <DialogToolbar
      title="New box"
      onClose={onClose}
      buttonText="Done"
      onClickButton={onClose}
    />
    <DialogContent>
      <br />
      <Typography variant="h6" data-cy="boxCreatedLabel" gutterBottom>
        Box created
      </Typography>
      <Typography gutterBottom>Write on the label:</Typography>
      <br />
      <Typography variant="h6" gutterBottom>
        <strong>{box.humanID}</strong>
      </Typography>
      <Typography variant="h6" gutterBottom data-cy="boxCreatedQuantityLabel">
        <strong>{box.quantity}x</strong>
      </Typography>
      <Typography variant="h6" gutterBottom>
        <strong>{selectedProduct}</strong>
      </Typography>
      <br />
      <Button
        variant="contained"
        onClick={onReset}
        color="primary"
        data-cy="createAnotherBoxButton"
      >
        Create another box
      </Button>
    </DialogContent>
  </div>
);

export default AddBoxDone;
