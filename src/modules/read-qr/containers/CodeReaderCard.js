import { connect } from "react-redux";
import CodeReaderCard from "../components/CodeReaderCard";
import { qrCodeRead } from "../actions/qrcode";

const mapStateToProps = ({ qrcode }) => ({ qrcode });
const mapDispatchToProps = { onScan: qrCodeRead };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeReaderCard);
