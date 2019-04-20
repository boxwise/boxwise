import { connect } from "react-redux";

import { userPasswordChange } from "../../actions/auth";
import PasswordChangeForm from "../../components/PasswordChangeForm";

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = { userPasswordChange };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordChangeForm);
