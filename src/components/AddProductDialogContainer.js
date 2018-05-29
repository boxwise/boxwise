import React from "react";
import AddProductDialog from "./AddProductDialog";
import firebase from "../firebase";

const AddProductDialogContainer = ({ onClose, ...props }) => (
  <AddProductDialog
    onSubmit={values => {
      firebase
        .firestore()
        .collection("products")
        .add(values)
        .then(product => {
          onClose();
        })
        .catch(console.error);
    }}
    onClose={onClose}
    {...props}
  />
);

export default AddProductDialogContainer;
