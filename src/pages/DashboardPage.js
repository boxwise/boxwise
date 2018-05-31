import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppFrame from "../components/AppFrame";
import Page from "../components/Page";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  paper: {
    padding: 16,
    width: "100%",
    marginBottom: theme.spacing.unit * 3
  },
  button: {
    marginRight: 20
  }
});

class DashboardPage extends React.Component {
  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <AppFrame title="Dashboard">
        <Page>
          <Grid container className={classes.root} xs={12} sm={9} md={7}>
            <Paper className={classes.paper}>
              <Typography variant="headline" paragraph="true">
                Things to do
              </Typography>
              <Button
                variant="raised"
                color="secondary"
                className={classes.button}
                href="/makebox-ui"
              >
                Make a box
              </Button>
              <Button
                variant="raised"
                color="secondary"
                className={classes.button}
                href="/findbox-ui"
              >
                Find a box
              </Button>
            </Paper>
          </Grid>
        </Page>
      </AppFrame>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardPage);
