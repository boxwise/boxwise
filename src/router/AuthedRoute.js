import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Progress from "../components/Progress.js";

const styles = theme => ({
    progress: {
    margin: theme.spacing.unit * 4,
    display: "flex",
    justifyContent: "center"
  }
});
const AuthedRoute = ({
  user,
  profile,
  classes,
  authedComponent: AuthedComponent,
  unauthedComponent: UnauthedComponent,
  ...rest
}) => {
  const isLoggedIn = !!user.data;
  const renderDefault = !UnauthedComponent;

  return (
    <Route
      {...rest}
      render={props =>
        // First, wait for user to load
        user.loading ? (
          <div className={classes.progress}>
            <Progress />
          </div>
        ) : // Are we logged in?
        isLoggedIn ? (
          // Wait for profile to load if logged in
          profile.loading ? (
            <div className={classes.progress}>
              <Progress />
            </div>
          ) : (
            <AuthedComponent {...props} />
          )
        ) : //Default behavior: Go to HomePage is not authed.
        renderDefault ? (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        ) : (
          <UnauthedComponent {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});

// https://github.com/reduxjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(withStyles(styles)(AuthedRoute));
