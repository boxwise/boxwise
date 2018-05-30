import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";

const AppDrawerAuth = ({ isFetching, user, profile, onSignOut }) => {
  if (isFetching) {
    return <CircularProgress />;
  }
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
  isFetching: PropTypes.bool,
  user: PropTypes.object,
  profile: PropTypes.object,
  onSignOut: PropTypes.func
};

export default AppDrawerAuth;
