import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { isEmpty, withFirebase } from "react-redux-firebase";

const AppDrawerAuth = ({ auth, firebase, organisation }) => {
  if (isEmpty(auth)) {
    return null;
  }
  return (
    <List>
      <ListItem>
        <ListItemText secondary={`Signed in as ${auth.email}`} />
      </ListItem>
      <ListItem>
        <ListItemText secondary={`Organisation ${organisation.id}`} />
      </ListItem>
      <ListItem button>
        <ListItemText
          primary="Sign Out"
          onClick={() => {
            firebase.auth().signOut();
          }}
        />
      </ListItem>
    </List>
  );
};

AppDrawerAuth.propTypes = {
  auth: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  organisation: state.organisation
});

export default compose(connect(mapStateToProps), withFirebase)(AppDrawerAuth);
