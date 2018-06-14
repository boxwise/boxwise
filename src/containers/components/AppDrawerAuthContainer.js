import { connect } from "react-redux";
import AppDrawerAuth from "../../components/AppDrawerAuth";
import { firebaseSignOut } from "../../actions/auth";

const mapStateToProps = ({ profile, user }) => ({ profile, user });
const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch(firebaseSignOut())
});
const mergeProps = ({ profile, user }, dispatchProps, ownProps) => ({
  user,
  profile,
  ...dispatchProps,
  ...ownProps,
  isFetching: !user || profile.isEmpty
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AppDrawerAuth);
