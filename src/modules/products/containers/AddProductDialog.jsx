import { connect } from "react-redux";

import ProductDialog from "../components/ProductDialog";
import { productAdd } from "../actions";

// You should almost never be using mergeProps
const mapDispatchToProps = { productAdd };
const mergeProps = (stateProps, { productAdd }, { onClose, ...props }) => ({
  ...props,
  ...stateProps,
  onClose,
  onSubmit: product => productAdd(product).then(onClose)
});

export default connect(
  null,
  mapDispatchToProps,
  mergeProps
)(ProductDialog);
