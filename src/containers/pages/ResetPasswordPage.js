import { connect } from "react-redux";
import ResetPasswordPage from "../../pages/ResetPasswordPage";

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(ResetPasswordPage);
