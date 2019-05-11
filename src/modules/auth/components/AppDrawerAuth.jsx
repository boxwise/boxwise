import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Progress from "components/Progress";

const AppDrawerAuth = ({ user }) => {
  if (!user) {
    return <Progress />;
  }

  const { displayName, organizationName } = user;

  return (
    <List>
      <ListItem>
        <ListItemText
          data-cy="signedInAsLabel"
          secondary={`Signed in as ${displayName}`}
        />
      </ListItem>
      <ListItem>
        <ListItemText secondary={`Organization: ${organizationName}`} />
      </ListItem>
      <ListItem
        component={Link}
        to="/invite"
        data-cy="inviteDrawerButton"
        button
      >
        <ListItemText primary="Invite people" />
      </ListItem>
      <ListItem
        component={Link}
        to="/password"
        data-cy="changePasswordDrawerButton"
        button
      >
        <ListItemText primary="Change password" />
      </ListItem>
      <ListItem
        component={Link}
        to="/signout"
        data-cy="signoutDrawerButton"
        button
      >
        <ListItemText primary="Sign out" />
      </ListItem>
    </List>
  );
};

export default AppDrawerAuth;
