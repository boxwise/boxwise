import { connect } from "react-redux";

import AddBoxDialog from "../components/AddBoxDialog";
import { addBox } from "../actions";

const mapStateToProps = ({ profile }) => ({ profile });
const mapDispatchToProps = { addBox };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBoxDialog);
