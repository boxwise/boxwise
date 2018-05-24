import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 8
  },
  flex: {
    flex: 1
  }
});

const Navigation = ({ classes }) => (
  <AppBar position="static" className={classes.root}>
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        Drop App
      </Typography>
      <Button component={Link} to="/signup" color="inherit">
        Sign Up
      </Button>
      <Button component={Link} to="/signin" color="inherit">
        Sign In
      </Button>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Navigation);
