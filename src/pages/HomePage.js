import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Page from "../components/Page";

const styles = theme => ({});

const HomePage = ({ auth, classes }) => (
  <Page>
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          {!isLoaded(auth) ? (
            <p>Loading...</p>
          ) : isEmpty(auth) ? (
            <p>You are not logged in.</p>
          ) : (
            <p>Hello {auth.email}.</p>
          )}
        </Typography>
      </Grid>
    </Grid>
  </Page>
);

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

export default compose(withStyles(styles), connect(mapStateToProps))(HomePage);
