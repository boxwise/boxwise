import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Progress from "components/Progress";

const AppDrawerAuth = ({
  notAuthenticated,
  loading,
  user,
  profile,
  onSignOut,
  onClose
}) => {
  if (loading) {
    return <Progress />;
  }
  if (notAuthenticated) {
    return null;
  }

  const { email } = user.data;
  const { name, organization } = profile.data;

  return (
    <List>
      <ListItem>
        <ListItemText 
          data-cy="signedInAsLabel"
          secondary={`Signed in as ${name || email}`} 
        />
      </ListItem>
      <ListItem>
        <ListItemText secondary={`Organization: ${organization.name}`} />
      </ListItem>
      <ListItem
        component={Link}
        to="/invite"
        onClick={onClose}
        data-cy="inviteDrawerButton"
        button
      >
        <ListItemText primary="Invite people" />
      </ListItem>
      <ListItem
        component={Link}
        to="/password"
        onClick={onClose}
        data-cy="changePasswordDrawerButton"
        button
      >
        <ListItemText primary="Change password" />
      </ListItem>
      <ListItem data-cy="signoutDrawerButton" button>
        <ListItemText primary="Sign out" onClick={onSignOut} />
      </ListItem>
    </List>
  );
};

export default AppDrawerAuth;
