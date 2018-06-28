import { connect } from "react-redux";
import ProductTableWrapper from "../../components/ProductTableWrapper";
import { productDeleteConfirm, productList } from "../../actions/product";

const mapStateToProps = ({ products }) => ({ products });
const mapDispatchToProps = { productDeleteConfirm, productList };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTableWrapper);
