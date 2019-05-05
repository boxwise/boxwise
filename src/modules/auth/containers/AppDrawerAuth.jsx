import { connect } from "react-redux";

import AppDrawerAuth from "../components/AppDrawerAuth";
import { firebaseSignOut } from "../actions";

const mapStateToProps = ({ profile, user }) => ({
  profile,
  user,
  notAuthenticated: !user.data || !profile.data,
  loading: user.loading || profile.loading
});

const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch(firebaseSignOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawerAuth);
