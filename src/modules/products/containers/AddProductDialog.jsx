import { connect } from "react-redux";

import ProductDialog from "../components/ProductDialog";
import { productAdd } from "../actions";

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: product => dispatch(productAdd(product)).then(ownProps.onClose)
});

export default connect(
  null,
  mapDispatchToProps
)(ProductDialog);
