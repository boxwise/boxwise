import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SignInPage from "../../pages/SignInPage";

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(withRouter(SignInPage));
