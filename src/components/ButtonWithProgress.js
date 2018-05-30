import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  root: {
    position: "relative"
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
};

const ButtonWithProgress = ({ classes, children, loading, ...props }) => (
  <div className={classes.root}>
    <Button disabled={loading} {...props}>
      {children}
    </Button>
    {loading && <CircularProgress size={24} className={classes.progress} />}
  </div>
);

ButtonWithProgress.propTypes = {
  loading: PropTypes.bool.isRequired
};

ButtonWithProgress.defaultProps = {
  loading: false
};

export default withStyles(styles)(ButtonWithProgress);
