import React from "react";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppDrawer from "./AppDrawer";
import { drawerTheme } from "../theme";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "stretch",
    minHeight: "100vh",
    width: "100%"
  },
  rootLocked: {
    display: "flex",
    alignItems: "stretch",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden"
  },
  grow: {
    flex: "1 1 auto"
  },
  title: {
    flex: "0 1 auto"
  },
  appBar: {
    transition: theme.transitions.create("width"),
    "@media print": {
      position: "absolute"
    },
    [theme.breakpoints.up("lg")]: {
      width: "calc(100% - 250px)"
    }
  },
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: 250
    }
  },
  children: {
    flex: "1 1 100%",
    maxWidth: "100%",
    // margin: "0 auto",
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.breakpoints.values.md
    }
  },
  hamburger: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  }
});

class AppFrame extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  render() {
    const { children, classes, title } = this.props;
    const divClass = this.mobileOpen ? classes.rootLocked : classes.root;
    return (
      <div className={divClass}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classes.hamburger}
            >
              <MenuIcon />
            </IconButton>
            {title !== null && (
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                {title}
              </Typography>
            )}
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
        <MuiThemeProvider theme={drawerTheme}>
          <AppDrawer
            className={classes.drawer}
            disablePermanent={false}
            onClose={this.handleDrawerClose}
            onOpen={this.handleDrawerOpen}
            mobileOpen={this.state.mobileOpen}
          />
        </MuiThemeProvider>
        <div className={classes.children}>
          <Toolbar />
          {children}
        </div>
      </div>
    );
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string
};

export default withStyles(styles)(AppFrame);
