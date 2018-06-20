import { connect } from "react-redux";
import AddBoxDialog from "../../components/AddBoxDialog";
import { addBox } from "../../actions/box";

const mapStateToProps = ({ profile }) => ({ profile });
const mapDispatchToProps = { addBox };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBoxDialog);
