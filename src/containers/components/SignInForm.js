import { connect } from "react-redux";
import { userSignIn } from "../../actions/auth";
import SignInForm from "../../components/SignInForm";

const mapStateToProps = ({ user: { error, loading } }) => ({ error, loading });
const mapDispatchToProps = { userSignIn };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
