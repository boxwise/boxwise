import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import AddBoxForm from "./AddBoxForm";
import AddBoxDone from "./AddBoxDone";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const AddBoxDialog = ({
  classes,
  open,
  box,
  products,
  done,
  onClose,
  onReset,
  onSubmit
}) => (
  <Dialog
    fullScreen
    open={open}
    onClose={onClose}
    aria-labelledby="form-dialog-title"
    fullWidth
    TransitionComponent={Transition}
  >
    {done ? (
      <AddBoxDone box={box} onClose={onClose} onReset={onReset} />
    ) : (
      <AddBoxForm products={products} onClose={onClose} onSubmit={onSubmit} />
    )}
  </Dialog>
);

AddBoxDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  box: PropTypes.object,
  done: PropTypes.bool.isRequired
};

export default AddBoxDialog;
