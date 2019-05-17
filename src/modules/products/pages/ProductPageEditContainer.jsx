import { connect } from "react-redux";

import { updateProduct, getAllProducts } from "../actions";
import { getProductFromState } from "../reducer";

import ProductPage from "./ProductPage";

export default connect(
  // TODO: serverErrorMessage
  (state, ownProps) => ({
    productToEdit: getProductFromState(state, ownProps.match.params.productId)
  }),
  (dispatch, ownProps) => ({
    onSubmit: values =>
      dispatch(updateProduct({ id: ownProps.productId, ...values })),
    productList: () => dispatch(getAllProducts())
  })
)(ProductPage);
