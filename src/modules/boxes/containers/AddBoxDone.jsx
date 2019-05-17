import { connect } from "react-redux";

import { getBoxWithProductInfoFromState } from "modules/boxes/reducer";

import AddBoxDone from "../components/AddBoxDone";

const mapStateToProps = (state, props) => ({
  box: getBoxWithProductInfoFromState(state, props.boxId).data
});
export default connect(mapStateToProps)(AddBoxDone);
