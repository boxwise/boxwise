import React from "react";
import { withRouter, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Page from "components/Page";
import CreateOrganizationFlow from "components/CreateOrganizationFlow";

const styles = theme => ({
  titleText: {
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto"
    }
  }
});

export const CreateOrganizationPage = ({ classes, history }) => (
  <div>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="go back"
          component={Link}
          to="/signin"
        >
          <ArrowBack />
        </IconButton>
        <Typography
          className={classes.titleText}
          variant="h6"
          color="inherit"
          noWrap
        >
          {"Set up Boxwise"}
        </Typography>
      </Toolbar>
    </AppBar>
    <Toolbar />
    <Page>
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <br />
          <br />
          <CreateOrganizationFlow
            onDone={() => {
              history.push("/");
            }}
          />
        </Grid>
      </Grid>
    </Page>
  </div>
);

export default withStyles(styles)(withRouter(CreateOrganizationPage));
