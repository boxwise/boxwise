import React from "react";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AppDrawer from "./AppDrawer";
import { drawerTheme } from "../theme";

const secondaryBarHeight = 30;

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
      width: "calc(100% - 250px)",
      height: 61
    }
  },
  secondaryBar: {
    marginTop: 61,
    height: 30,
    transition: theme.transitions.create("width"),
    "@media print": {
      position: "absolute"
    },
    [theme.breakpoints.up("lg")]: {
      width: "calc(100% - 250px)",
    },
    [theme.breakpoints.only('xs')]: {
      marginTop: 48,
    },

  },
  secondaryToolbar: {
    height: secondaryBarHeight,
    minHeight: 0
  },
  secondaryDropdown: {
    fontSize: 12,
    color: "#b2e1f3"
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
    marginTop: secondaryBarHeight,
    [theme.breakpoints.up("md")]: {
      maxWidth: theme.breakpoints.values.md
    }
  },
  hamburger: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  popupTitle: {
    margin: "6 4",
    fontSize: 15
  }
});

class AppFrame extends React.Component {
  state = {
    mobileOpen: false,
    anchorEl: null
  };

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { children, classes, title } = this.props;
    const { mobileOpen, anchorEl } = this.state;
    const open = Boolean(anchorEl);
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
                variant="title"
                color="inherit"
                noWrap
              >
                {title}
              </Typography>
            )}
            <div className={classes.grow} />

            <div> 
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
            </div>  

          </Toolbar>
        </AppBar>


        <AppBar className={classes.secondaryBar} position="fixed">
          <Toolbar className={classes.secondaryToolbar}>
            <div>
              <Button 
                color="inherit"
                onClick={this.handleMenu} 
                className={classes.secondaryDropdown}
              >
                Product
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
              >
                <div className={classes.popupTitle}>Choose a category</div>
                <MenuItem onClick={this.handleClose}>Man</MenuItem>
                <MenuItem onClick={this.handleClose}>Woman</MenuItem>
                <MenuItem>Adult</MenuItem>
                <MenuItem>...</MenuItem>
              </Menu>
            </div>  
            <Button color="inherit" className={classes.secondaryDropdown}>
              Status
            </Button>
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