import { connect } from "react-redux";

import { firebaseSignOut, getCurrentUserFromState } from "modules/auth/actions";

import AppDrawerAuth from "./AppDrawerAuth";

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
