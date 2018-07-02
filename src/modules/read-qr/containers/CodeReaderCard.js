import { connect } from "react-redux";
import CodeReaderCard from "../components/CodeReaderCard";
import { qrCodeRead, toggleBoxDialog } from "../actions/qrcode";

const mapStateToProps = ({ qrcode }) => ({ qrcode });
const mapDispatchToProps = { onScan: qrCodeRead, toggleBoxDialog };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeReaderCard);
