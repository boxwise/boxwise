import { connect } from "react-redux";

import ProductDialog from "../components/ProductDialog";
import { productEdit } from "../actions";

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: values =>
    dispatch(productEdit({ id: ownProps.productToEdit.id, ...values })).then(
      ownProps.onClose
    )
});

export default connect(
  null,
  mapDispatchToProps
)(ProductDialog);
