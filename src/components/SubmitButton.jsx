import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
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
  },
  submitInDialog: {},
  submitInPage: {
    marginTop: theme.spacing.unit * 2
  }
});

const SubmitButton = ({
  classes,
  children,
  isSubmitting = false,
  isInDialog = false,
  dataTestId,
  ...props
}) => (
  <div
    className={[
      classes.root,
      isInDialog ? classes.submitInDialog : classes.submitInPage
    ].join(" ")}
  >
    <Button
      variant={isInDialog ? "text" : "contained"}
      color="primary"
      type="submit"
      data-testid={dataTestId}
      disabled={isSubmitting}
      {...props}
    >
      {children}
    </Button>
    {isSubmitting && (
      <CircularProgress size={24} className={classes.progress} />
    )}
  </div>
);

export default withStyles(styles)(SubmitButton);
