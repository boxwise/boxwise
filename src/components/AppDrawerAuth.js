import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Progress from "./Progress.js";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  smallerTextGroup: {
    paddingTop: 20,
    paddingBottom: 20
  },
  smallerLink: {
    '&:hover': {
      cursor: "pointer"
    }
  }
});  

const AppDrawerAuth = ({
  notAuthenticated,
  loading,
  user,
  profile,
  onSignOut,
  onPasswordChange,
  classes,
  onClose
}) => {
  if (loading) {
    return <Progress />;
  } else if (notAuthenticated) {
    return null;
  }

  const { email } = user.data;
  const { name, organization } = profile.data;

  return (
    <div>
      <List className={classes.smallerTextGroup}>
        <ListItem className={classes.noPadding}>
          <ListItemText secondary={`Signed in as ${name ? name : email}`} />
        </ListItem>
        <ListItem className={classes.noPadding}>
          <ListItemText secondary={`for ${organization.name}`} />
        </ListItem>
      </List>

      <List className={classes.smallerTextGroup}>
        <ListItem className={classes.noPadding}>
          <ListItemText secondary="Logout" className={classes.smallerLink} onClick={onSignOut} />
        </ListItem>
      </List>  
    </div>
  );
};

AppDrawerAuth.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  profile: PropTypes.object,
  onSignOut: PropTypes.func,
  onClose: PropTypes.func
};

export default withStyles(styles)(AppDrawerAuth);
