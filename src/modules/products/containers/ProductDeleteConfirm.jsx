import { connect } from "react-redux";

import ConfirmDeleteAlert from "components/ConfirmDeleteAlert";

import { productDelete, productDeleteCancel } from "../actions";

const mapStateToProps = ({ products: { confirmDeleteOf } }) => ({
  confirmDeleteOf
});
const mapDispatchToProps = { productDelete, productDeleteCancel };

const mergeProps = (
  { confirmDeleteOf },
  { productDelete, productDeleteCancel },
  ownProps
) => ({
  ...ownProps,
  open: !!confirmDeleteOf,
  onConfirm: () => productDelete(confirmDeleteOf),
  onCancel: productDeleteCancel
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ConfirmDeleteAlert);
