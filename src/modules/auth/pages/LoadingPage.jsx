import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Progress from "components/Progress";
import { Page } from "modules/layout/components";

const styles = theme => ({
  paper: {
    display: "block",
    margin: "50px auto",
    textAlign: "center",
    padding: theme.spacing.unit * 3
  },
  para: { marginTop: theme.spacing.unit * 3 }
});

const Loading = ({ classes }) => {
  return (
    <Page>
      <Grid container>
        <Paper className={classes.paper}>
          <Progress />
          <Typography variant="h5" paragraph className={classes.para}>
            Connecting to Boxwise...
          </Typography>
        </Paper>
      </Grid>
    </Page>
  );
};

export default withStyles(styles)(Loading);
