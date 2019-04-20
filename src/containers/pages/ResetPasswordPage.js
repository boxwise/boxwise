import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ResetPasswordPage from "pages/ResetPasswordPage";

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(withRouter(ResetPasswordPage));
