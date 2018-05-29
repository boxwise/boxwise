import React from "react";
import AddBoxDialog from "./AddBoxDialog";
import firebase from "../firebase";

const AddBoxDialogContainer = ({ onClose, ...props }) => (
  <AddBoxDialog
    onSubmit={values => {
      firebase
        .firestore()
        .collection("boxes")
        .add(values)
        .then(box => {
          onClose();
        })
        .catch(console.error);
    }}
    onClose={onClose}
    {...props}
  />
);

export default AddBoxDialogContainer;
