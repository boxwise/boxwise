import { connect } from "react-redux";
import SignInPage from "../../pages/SignInPage";

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(SignInPage);
