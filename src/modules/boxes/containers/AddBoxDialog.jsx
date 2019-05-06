import { connect } from "react-redux";

import { getAllProductsFromState } from "modules/products/reducer";
import { productList } from "modules/products/actions";

import AddBoxDialog from "../components/AddBoxDialog";
import { addBox } from "../actions";

const mapStateToProps = state => ({
  products: getAllProductsFromState(state),
  profile: state.profile
});
const mapDispatchToProps = { addBox, fetchData: productList };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBoxDialog);
