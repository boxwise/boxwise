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
  notAuthenticated: !user.data || !profile.data,
  isFetching: user.isFetching || profile.isFetching
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AppDrawerAuth);
