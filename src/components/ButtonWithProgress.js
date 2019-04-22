import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    {loading && <CircularProgress size={24} className={classes.progress} />}
  </div>
);

export default withStyles(styles)(ButtonWithProgress);
