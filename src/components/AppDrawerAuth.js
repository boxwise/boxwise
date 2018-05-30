import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const AppDrawerAuth = ({ user, profile, onSignOut }) => {
  return (
    <List>
      <ListItem>
        <ListItemText secondary={`Signed in as ${user.email}`} />
      </ListItem>
      <ListItem>
        <ListItemText
          secondary={`Organization: ${profile.organization.name}`}
        />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Sign Out" onClick={onSignOut} />
      </ListItem>
    </List>
  );
};

AppDrawerAuth.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired
};

export default AppDrawerAuth;
