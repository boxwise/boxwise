import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";

const AppDrawerAuth = ({ isFetching, user, profile, onSignOut, onClose }) => {
  if (isFetching) {
    return <CircularProgress />;
  }
  return (
    <List>
      <ListItem>
        <ListItemText secondary={`Signed in as ${user.data.email}`} />
      </ListItem>
      <ListItem>
        <ListItemText
          secondary={`Organization: ${profile.organization.name}`}
        />
      </ListItem>
      <ListItem component={Link} to="/invite" onClick={onClose} button>
        <ListItemText primary="Invite people" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Sign out" onClick={onSignOut} />
      </ListItem>
    </List>
  );
};

AppDrawerAuth.propTypes = {
  isFetching: PropTypes.bool,
  user: PropTypes.object,
  profile: PropTypes.object,
  onSignOut: PropTypes.func,
  onClose: PropTypes.func
};

export default AppDrawerAuth;
