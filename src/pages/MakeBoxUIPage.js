import React from "react";
import AppFrame from "../components/AppFrame";
import Page from "../components/Page";
import AddBoxDialogContainer from "../components/AddBoxDialogContainer";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import BoxTableContainer from "../components/BoxTableContainer";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  instruction: {
    padding: 16,
    marginTop: theme.spacing.unit * 3,
    height: 240,
    width: "100%"
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class MakeBoxUIPage extends React.Component {
  state = {
    spacing: "16"
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.root} xs={11} md={7} lg={4}>
        <Paper className={classes.instruction}>
          <Typography variant="headline" paragraph="true">
            Make a new box
          </Typography>
          <Typography component="p" paragraph="true">
            We assume you have a box with items that all belong to the same
            category. For example T-Shirts for men.
          </Typography>
          <Typography component="p" paragraph="true">
            Make sure you have counted the items in the box.
          </Typography>
          {/*         	<Typography component="p" paragraph="true">Take a new barcode label and scan the code with your phone</Typography>*/}
          <Typography component="p" paragraph="true">
            Barcodes are not yet operational. Press "Next Step" to proceed
            making a box without a barcode
          </Typography>
          <div>
            <Button variant="raised" color="primary">
              Next step
            </Button>
          </div>
        </Paper>
        <Paper className={classes.instruction}>
          <Typography variant="headline" paragraph="true">
            Make a new box
          </Typography>
          "hello"
        </Paper>
      </Grid>
    );
  }
}

MakeBoxUIPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MakeBoxUIPage);
