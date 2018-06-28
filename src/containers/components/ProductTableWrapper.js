import { connect } from "react-redux";
import ProductTableWrapper from "../../components/ProductTableWrapper";
import { productDeleteConfirm } from "../../actions/product";

const mapStateToProps = ({ profile }) => ({ profile });
const mapDispatchToProps = { productDeleteConfirm };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTableWrapper);
