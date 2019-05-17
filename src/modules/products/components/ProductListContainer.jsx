import { connect } from "react-redux";

import { deleteProduct, getAllProducts } from "../actions";
import { getAllProductsFromState } from "../reducer";

import ProductList from "./ProductList";

export default connect(
  state => ({ products: getAllProductsFromState(state) }),
  { deleteProduct, getAllProducts }
)(ProductList);
