/* eslint-disable */

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
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";
import CategorySelector from "../components/CategorySelector";
import ProductSelector from "../components/ProductSelector";
import ProductButton from "../components/ProductButton";

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
  paper: {
    padding: 16,
    width: "100%",
    marginBottom: theme.spacing.unit * 3
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  inputItemCount: {
    marginRight: theme.spacing.unit,
    width: 150
  },
  inputComments: {
    marginRight: theme.spacing.unit,
    width: "100%"
  }
});

class MakeBoxMockupPage extends React.Component {
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
      <AppFrame title="Make a new box">
        <Page>
          <Grid container className={classes.root} xs={12} sm={9} md={7}>
            <Paper className={classes.paper}>
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
              <Button variant="raised" color="secondary">
                Next step
              </Button>
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subheading" paragraph="true">
                Choose a product category for this box
              </Typography>
              <CategorySelector />
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subheading" paragraph="true">
                Current category:
              </Typography>
              <ProductButton icon="male" label="Man" />
              <div style={{ clear: "both" }} />
              <Typography variant="subheading" paragraph="true">
                Choose a product
              </Typography>
              <ProductSelector />
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subheading" paragraph="true">
                Fill in the rest of the details for this box
              </Typography>
              <ProductButton icon="male" label="Man" />
              <ProductButton icon="tshirt" label="T-Shirt" />
              <div style={{ clear: "both" }} />
              <TextField
                id="itemcount"
                label="Number of items"
                type="number"
                className={classes.inputItemCount}
                margin="normal"
              />
              <TextField
                id="comments"
                label="Comments"
                multiline
                className={classes.inputComments}
                margin="normal"
              />
              <Button variant="raised" color="secondary">
                Save this box
              </Button>
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subheading" paragraph="true">
                Finish the box
              </Typography>
              <Typography component="p" paragraph="true">
                Write this information on the label:
              </Typography>
              <Typography variant="headline" paragraph="true">
                642213<br />
                40x<br />
                T-Shirts Man
              </Typography>
              <Typography component="p" paragraph="true">
                Attach the label to the box, close it and store it on the right
                position in the warehouse.
              </Typography>
              <Button variant="raised" color="secondary">
                Make another box
              </Button>
            </Paper>
          </Grid>
        </Page>
      </AppFrame>
    );
  }
}

MakeBoxMockupPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MakeBoxMockupPage);
