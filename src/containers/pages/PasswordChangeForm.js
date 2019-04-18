import { connect } from "react-redux";
import PasswordChangePage from "../../pages/PasswordChangePage";

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(PasswordChangePage);
