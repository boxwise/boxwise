import { connect } from "react-redux";

import ProductTableWrapper from "../components/ProductTable";
import { productDeleteConfirm, productList } from "../actions";

const mapStateToProps = ({ products }) => ({ products });
const mapDispatchToProps = { productDeleteConfirm, productList };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTableWrapper);
