import React from "react";
import { connect } from "react-redux";
import ProductDialog from "./ProductDialog";
import firebase from "../firebase";
import { handleError } from "../utils";

const EditProductDialogContainer = ({
  onClose,
  profile,
  product,
  ...props
}) => (
  <ProductDialog
    initialValue={product}
    onSubmit={values => {
      firebase
        .firestore()
        .collection("products")
        .doc(product.id)
        .update(values)
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
}))(EditProductDialogContainer);
