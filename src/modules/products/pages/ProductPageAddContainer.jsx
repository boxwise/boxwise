import { connect } from "react-redux";

import { addProduct } from "../actions";

import ProductPage from "./ProductPage";

export default connect(
  null, // TODO: serverErrorMessage
  { onSubmit: addProduct }
)(ProductPage);
