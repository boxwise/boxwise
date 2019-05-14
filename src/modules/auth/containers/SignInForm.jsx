import { connect } from "react-redux";

import { userSignIn } from "../actions";
import SignInForm from "../components/SignInForm";

const mapStateToProps = ({ user: { error } }) => ({
  serverError: error,
});
const mapDispatchToProps = { userSignIn };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
