import { connect } from "react-redux";

import { getAllProductsFromState } from "modules/products/reducer";
import { getAllProducts } from "modules/products/actions";

import AddBoxDialog from "../components/AddBoxDialog";
import { addBox } from "../actions";

const mapStateToProps = state => ({
  products: getAllProductsFromState(state),
  serverError: state.boxes.error
});

const mapDispatchToProps = { addBox, fetchData: getAllProducts };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBoxDialog);
