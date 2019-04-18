import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ButtonWithProgress from "./ButtonWithProgress";

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
  onClickButton
}) => (
  <AppBar color="default" className={classes.appBar}>
    <Toolbar>
      <IconButton color="inherit" onClick={onClose} aria-label="Close">
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" className={classes.flex}>
        {title}
      </Typography>
      <ButtonWithProgress
        color="primary"
        onClick={onClickButton}
        loading={buttonIsLoading}
      >
        {buttonText}
      </ButtonWithProgress>
    </Toolbar>
  </AppBar>
);

DialogToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClickButton: PropTypes.func.isRequired
};

export default withStyles(styles)(DialogToolbar);
