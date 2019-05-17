import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBack from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";

import { drawerTheme } from "theme";

import AppDrawer from "./AppDrawer";

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

const AppFrame = ({
  children,
  classes,
  title,
  showBackButton = false,
  showCloseButton = false,
  history
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerOpen = () => setMobileOpen(true);
  const handleDrawerClose = () => setMobileOpen(false);

  const divClass = mobileOpen ? classes.rootLocked : classes.root;
  return (
    <div className={divClass}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          {showBackButton || showCloseButton ? (
            <IconButton
              color="inherit"
              aria-label="go back"
              onClick={() => history.goBack()}
            >
              {showBackButton ? <ArrowBack /> : <CloseIcon />}
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={classes.hamburger}
              data-testid="appDrawerOpener"
            >
              <MenuIcon />
            </IconButton>
          )}
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
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
          mobileOpen={mobileOpen}
        />
      </MuiThemeProvider>
      <div className={classes.children}>
        <Toolbar />
        {children}
      </div>
    </div>
  );
};

export default withRouter(withStyles(styles)(AppFrame));
