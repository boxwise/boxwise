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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  menuIcon: {
    height: 20,
    marginRight: 10
  },
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
          <Button variant="raised" color="primary">
            Next step
          </Button>
        </Paper>
        <Paper className={classes.instruction}>
          <Typography variant="headline" paragraph="true">
            Make a new box
          </Typography>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange}
                inputProps={{
                  name: "category",
                  id: "category"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>
                  <i className="fas fa-male" /> Man
                </MenuItem>
                <MenuItem value={2}>
                  <i className="fas fa-female" /> Woman
                </MenuItem>
                <MenuItem value={3}>
                  <i className="fas fa-female" /> Adult
                </MenuItem>
                <MenuItem value={4}>
                  <i className="fas fa-child" /> Boy
                </MenuItem>
                <MenuItem value={5}>
                  <i className="fas fa-child" /> Girl
                </MenuItem>
                <MenuItem value={6}>
                  <i className="fas fa-child" /> Child
                </MenuItem>
                <MenuItem value={7}>
                  <i className="fas fa-child" /> Baby
                </MenuItem>
                <MenuItem value={8}>
                  <i className="fas fa-shower" /> Hygiene
                </MenuItem>
                <MenuItem value={9}>
                  <i className="fas fa-utensils" /> Food
                </MenuItem>
                <MenuItem value={10}>
                  <i className="fas fa-ellipsis-v" /> Other
                </MenuItem>
              </Select>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    );
  }
}

MakeBoxUIPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MakeBoxUIPage);
