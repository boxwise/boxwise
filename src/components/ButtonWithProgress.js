import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Progress from "./Progress.js";

const styles = {
  root: {
    position: "relative",
    display: "inline-flex"
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
};

const ButtonWithProgress = ({
  classes,
  children,
  loading,
  className,
  ...props
}) => (
  <div className={[classes.root, className].join(" ")}>
    <Button disabled={loading} {...props}>
      {children}
    </Button>
    {loading && <Progress size={24} className={classes.progress} />}
  </div>
);

ButtonWithProgress.propTypes = {
  loading: PropTypes.bool.isRequired
};

ButtonWithProgress.defaultProps = {
  loading: false
};

export default withStyles(styles)(ButtonWithProgress);
