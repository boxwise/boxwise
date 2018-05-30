import React from "react";
import { connect } from "react-redux";
import AddProductDialog from "./AddProductDialog";
import firebase from "../firebase";

const AddProductDialogContainer = ({ onClose, organization, ...props }) => (
  <AddProductDialog
    onSubmit={values => {
      const firestore = firebase.firestore();
      values.organization = firestore.doc(`organizations/${organization}`);
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

export default connect(({ organization }) => ({
  organization: organization
}))(AddProductDialogContainer);
