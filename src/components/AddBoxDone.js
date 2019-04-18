import React from "react";
import PropTypes from "prop-types";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogToolbar from "./DialogToolbar";
import Button from "@material-ui/core/Button";

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
      <Typography variant="h6" gutterBottom>
        Box created
      </Typography>
      <Typography gutterBottom>Write on the label:</Typography>
      <br />
      <Typography variant="h6" gutterBottom>
        <strong>{box.humanID}</strong>
      </Typography>
      <Typography variant="h6" gutterBottom>
        <strong>{box.quantity}x</strong>
      </Typography>
      <Typography variant="h6" gutterBottom>
        <strong>{selectedProduct}</strong>
      </Typography>
      <br />
      <Button variant="contained" onClick={onReset} color="primary">
        Create another box
      </Button>
    </DialogContent>
  </div>
);

AddBoxDone.propTypes = {
  box: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

export default AddBoxDone;
