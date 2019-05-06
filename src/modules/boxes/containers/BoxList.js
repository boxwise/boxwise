import { connect } from "react-redux";

import { getAllProductsFromState } from "modules/products/reducer";
import { productList } from "modules/products/actions";

import { fetchBoxes } from "../actions";
import BoxList from "../components/BoxList";
import { getBoxesWithProductInfoFromState } from "../reducer";

export default connect(
  state => ({
    boxesWithProductInfo: getBoxesWithProductInfoFromState(state),
    products: getAllProductsFromState(state)
  }),
  dispatch => ({
    fetchBoxesAndProducts: () =>
      dispatch(fetchBoxes()).then(dispatch(productList()))
  })
)(BoxList);
