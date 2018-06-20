import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppFrame from "../components/AppFrame";
import AddBoxDialogContainer from "../components/AddBoxDialogContainer";
import { DIALOG_NAME as AddBoxDialog } from "../components/AddBoxDialog";
import { openDialog, closeDialog } from "../actions/dialog";
import Page from "../components/Page";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: theme.spacing.unit * 3
  })
});

class DashboardPage extends React.Component {
  state = {
    addBoxDialogOpen: false
  };

  render() {
    const { classes } = this.props;

    return (
      <AppFrame title="Dashboard">
        <Page>
          <AddBoxDialogContainer
            // open={this.state.addBoxDialogOpen}
            onClose={this.props.closeDialog}
          />
          <Paper className={classes.paper}>
            <Typography variant="headline" paragraph={true}>
              Things to do
            </Typography>
            <Button
              variant="raised"
              color="secondary"
              onClick={() => this.props.openDialog(AddBoxDialog)}
            >
              Make a box
            </Button>
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

export default withStyles(styles)(
  connect(
    null,
    { openDialog, closeDialog }
  )(DashboardPage)
);
