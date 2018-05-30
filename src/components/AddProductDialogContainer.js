import React from "react";
import { connect } from "react-redux";
import AddProductDialog from "./AddProductDialog";
import firebase from "../firebase";

const AddProductDialogContainer = ({ onClose, organisation, ...props }) => (
  <AddProductDialog
    onSubmit={values => {
      const firestore = firebase.firestore();
      values.organisation = firestore.doc(`organisations/${organisation}`);
      firestore
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

export default connect(({ organisation }) => ({
  organisation: organisation
}))(AddProductDialogContainer);
