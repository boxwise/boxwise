import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppFrame from "../components/AppFrame";
import Page from "../components/Page";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withOpenMakeBox } from "../containers/components/MakeBoxTrigger";

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: theme.spacing.unit * 3
  })
});

const MakeBoxButton = withOpenMakeBox(({ openMakeBox, children, ...props }) => (
  <Button onClick={openMakeBox} {...props}>
    {children}
  </Button>
));

class DashboardPage extends React.Component {
  state = {
    addBoxDialogOpen: false
  };

  render() {
    const { classes } = this.props;

    return (
      <AppFrame title="Dashboard">
        <Page>
          <Paper className={classes.paper}>
            <Typography variant="headline" paragraph={true}>
              Things to do
            </Typography>
            <MakeBoxButton variant="raised" color="secondary">
              Make a box
            </MakeBoxButton>
            <br />
            <br />
            <Button
              variant="raised"
              color="secondary"
              component={Link}
              to="/boxes"
            >
              Find boxes
            </Button>
          </Paper>
        </Page>
      </AppFrame>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardPage);
