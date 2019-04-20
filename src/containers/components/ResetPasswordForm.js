import { connect } from "react-redux";

import { resetPassword } from "actions/auth";
import ResetPasswordForm from "components/ResetPasswordForm";

const mapStateToProps = ({ user: { loading } }) => ({ loading });
const mapDispatchToProps = { resetPassword };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordForm);
