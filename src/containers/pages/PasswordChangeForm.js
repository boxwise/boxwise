import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PasswordChangePage from "../../pages/PasswordChangePage";

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(withRouter(PasswordChangePage));
