import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";

import AppDrawerAuth from "./AppDrawerAuthContainer";

const styles = theme => ({
  logo: {
    width: "75%"
  },
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper
  },
  title: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    textDecoration: "none"
  },
  // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
  toolbarIe11: {
    display: "flex"
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  }
});

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const AppDrawer = ({
  classes,
  className,
  disablePermanent,
  mobileOpen,
  onClose,
  onOpen
}) => {
  const drawer = (
    <div className={classes.nav} data-testid="appDrawerDiv">
      <div className={classes.toolbarIe11}>
        <div className={classes.toolbar}>
          <Link className={classes.title} to="/" onClick={onClose}>
            <img
              src="/images/boxwise-sidebar.png"
              alt="Boxwise logo"
              className={classes.logo}
            />
          </Link>
        </div>
      </div>
      <List>
        <ListItem component={Link} to="/" onClick={onClose} button>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          component={Link}
          to="/boxes"
          onClick={onClose}
          data-testid="boxesDrawerButton"
          button
        >
          <ListItemText primary="Find boxes" />
        </ListItem>
        <ListItem
          component={Link}
          to="/products"
          onClick={onClose}
          data-testid="productsDrawerButton"
          button
        >
          <ListItemText primary="Manage products" />
        </ListItem>
        <ListItem
          component={Link}
          to="/create-labels"
          onClick={onClose}
          data-testid="labelsDrawerButton"
          button
        >
          <ListItemText primary="Create labels" />
        </ListItem>
      </List>
      <Divider />
      <AppDrawerAuth onClose={onClose} />
    </div>
  );

  return (
    <div className={className}>
      <Hidden lgUp={!disablePermanent}>
        <SwipeableDrawer
          classes={{
            paper: classes.paper
          }}
          disableBackdropTransition={!iOS}
          variant="temporary"
          open={mobileOpen}
          onOpen={onOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawer}
        </SwipeableDrawer>
      </Hidden>
      {disablePermanent ? null : (
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.paper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      )}
    </div>
  );
};

export default withStyles(styles)(AppDrawer);
