import React from "react";
import { connect } from "react-redux";
import AddProductDialog from "./AddProductDialog";
import firebase from "../firebase";
import { handleError } from "../utils";

const AddProductDialogContainer = ({ onClose, profile, ...props }) => (
  <AddProductDialog
    onSubmit={values => {
      const firestore = firebase.firestore();
      values.organization = firestore.doc(profile.organization.ref);
      values.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      values.createdBy = firestore.doc(profile.ref);
      values.isDeleted = false;
      firestore
        .collection("products")
        .add(values)
        .then(product => {
          onClose();
        })
        .catch(handleError); // TODO: actually handle the error
    }}
    onClose={onClose}
    {...props}
  />
);

export default connect(state => ({
  profile: state.profile
}))(AddProductDialogContainer);
