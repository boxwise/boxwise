import { connect } from "react-redux";

import AppDrawerAuth from "../components/AppDrawerAuth";
import { firebaseSignOut, getCurrentUserFromState } from "../actions";

const mapStateToProps = state => ({
  user: getCurrentUserFromState(state)
});

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch(firebaseSignOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawerAuth);
