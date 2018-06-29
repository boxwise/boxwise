import { connect } from "react-redux";
import CodeReaderCard from "../components/CodeReaderCard";
import { qrCodeRead } from "../actions/qrcode";

const mapStateToProps = ({ qrcode }) => ({ qrcode });
const mapDispatchToProps = dispatch => ({
  onScan: code => dispatch(qrCodeRead(code))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeReaderCard);
