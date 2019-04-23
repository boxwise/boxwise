import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  titleText: {
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto"
    }
  }
});

export const AppBarHeader = ({ classes, title, backUrl }) => (
  <AppBar position="fixed">
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="go back"
        component={Link}
        to={backUrl}
      >
        <ArrowBack />
      </IconButton>
      <Typography
        className={classes.titleText}
        variant="h6"
        color="inherit"
        noWrap
      >
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);
export default withStyles(styles)(AppBarHeader);
