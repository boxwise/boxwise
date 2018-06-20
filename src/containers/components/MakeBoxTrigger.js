import { connect } from "react-redux";
import { openDialog } from "../../actions/dialog";
import { DIALOG_NAME as AdBoxDialogName } from "../../components/AddBoxDialog";

const mapDispatchToProps = { openMakeBox: () => openDialog(AdBoxDialogName) };
export const withOpenMakeBox = Component =>
  connect(
    null,
    mapDispatchToProps
  )(Component);
