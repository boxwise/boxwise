import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HomePage from "../../pages/HomePage";

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(withRouter(HomePage));
