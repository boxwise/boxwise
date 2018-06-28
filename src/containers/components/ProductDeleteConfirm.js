import connect from "react-redux/lib/connect/connect";
import ConfirmDeleteAlert from "../../components/ConfirmDeleteAlert";
import { productDelete, productDeleteCancel } from "../../actions/product";

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
