import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Page from "components/Page";
import AppFrame from "components/AppFrame";

const styles = theme => ({
  div: {
    display: "block",
    margin: "10 auto",
    textAlign: "center",
    fontFamily: "Zinnebeeld"
  },
  image: {
    width: 211,
    height: 209,
    margin: "10% auto 20px auto"
  },
  paper: {
    textAlign: "center",
    padding: 16,
    paddingBottom: 50,
    width: "100%",
    marginBottom: theme.spacing.unit * 3
  }
});

class NotFound extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <AppFrame title="Not found">
        <Page>
          <Grid container>
            <Paper className={classes.paper}>
              <img
                src="/images/empty-box.png"
                alt="empty box"
                className={classes.image}
              />
              <Typography variant="h5" paragraph>
                There is nothing here
              </Typography>
              <Typography component="p" paragraph>
                What you are looking for might
                <br />
                be in the main menu on the left.
              </Typography>
            </Paper>
          </Grid>
        </Page>
      </AppFrame>
    );
  }
}

export default withStyles(styles)(NotFound);
