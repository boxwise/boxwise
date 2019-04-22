import { connect } from "react-redux";

import { resetPassword } from "../actions";
import ResetPasswordForm from "../components/ResetPasswordForm";

const mapStateToProps = ({ user: { loading, error } }) => ({ loading, error });
const mapDispatchToProps = { resetPassword };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordForm);
