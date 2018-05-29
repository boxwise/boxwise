import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const AppDrawerAuth = ({ profile, organisation, signOut }) => {
  return (
    <List>
      <ListItem>
        <ListItemText secondary={`Signed in as ${profile.email}`} />
      </ListItem>
      <ListItem>
        <ListItemText secondary={`Organisation: ${organisation.name}`} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Sign Out" onClick={signOut} />
      </ListItem>
    </List>
  );
};

AppDrawerAuth.propTypes = {
  profile: PropTypes.object.isRequired,
  organisation: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired
};

export default AppDrawerAuth;
