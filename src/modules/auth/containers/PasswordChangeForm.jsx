import { connect } from "react-redux";

import PasswordChangeForm from "../components/PasswordChangeForm";
import { userPasswordChange } from "../actions";

const mapStateToProps = ({ user }) => ({
  serverError: user.error && user.error.message
});
const mapDispatchToProps = { userPasswordChange };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordChangeForm);
