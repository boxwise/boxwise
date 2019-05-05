import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import SubmitButton from "./SubmitButton";

const styles = theme => ({
  appBar: {
    position: "relative",
    marginBottom: theme.spacing.unit
  },
  flex: {
    flex: 1
  }
});

const DialogToolbar = ({
  classes,
  title,
  onClose,
  buttonText,
  buttonIsLoading,
  onClickButton,
  dataCySubmitTag
}) => (
  <AppBar color="default" className={classes.appBar}>
    <Toolbar>
      <IconButton color="inherit" onClick={onClose} aria-label="Close">
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" className={classes.flex}>
        {title}
      </Typography>
      <SubmitButton
        isInDialog
        onClick={onClickButton}
        isSubmitting={buttonIsLoading}
        dataCyTag={dataCySubmitTag}
      >
        {buttonText}
      </SubmitButton>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(DialogToolbar);
