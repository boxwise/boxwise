import React from "react";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    flexGrow: 1
  }
});

const Page = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
);

export default withStyles(styles)(Page);
