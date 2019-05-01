import { connect } from "react-redux";

import ProductDialog from "../components/ProductDialog";
import * as actions from "../actions";

// You should almost never be using mergeProps
const mergeProps = (
  stateProps,
  { productEdit },
  { product, onClose, ...props }
) => ({
  ...props,
  ...stateProps,
  onClose,
  initialValue: product,
  onSubmit: values => productEdit({ id: product.id, ...values }).then(onClose)
});

export default connect(
  null,
  actions,
  mergeProps
)(ProductDialog);
