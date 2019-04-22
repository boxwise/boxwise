import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { Page, AppFrame } from "modules/layout/components";

import CategorySelector from "../components/CategorySelector";
import ProductSelectorMockup from "../components/ProductSelectorMockup";
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
              {/*         	<Typography component="p" paragraph="true">Take a new barcode label and scan the code with your phone</Typography> */}
              <Typography component="p" paragraph="true">
                Barcodes are not yet operational. Press &quot;Next Step&quot; to
                proceed making a box without a barcode
              </Typography>
              <Button variant="contained" color="secondary">
                Next step
              </Button>
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subtitle1" paragraph="true">
                Choose a product category for this box
              </Typography>
              <CategorySelector />
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subtitle1" paragraph="true">
                Current category:
              </Typography>
              <ProductButton icon="male" label="Man" />
              <div style={{ clear: "both" }} />
              <Typography variant="subtitle1" paragraph="true">
                Choose a product
              </Typography>
              <ProductSelectorMockup />
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subtitle1" paragraph="true">
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
              <Button variant="contained" color="secondary">
                Save this box
              </Button>
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subtitle1" paragraph="true">
                Finish the box
              </Typography>
              <Typography component="p" paragraph="true">
                Write this information on the label:
              </Typography>
              <Typography variant="h5" paragraph="true">
                642213
                <br />
                40x
                <br />
                T-Shirts Man
              </Typography>
              <Typography component="p" paragraph="true">
                Attach the label to the box, close it and store it on the right
                position in the warehouse.
              </Typography>
              <Button variant="contained" color="secondary">
                Make another box
              </Button>
            </Paper>
          </Grid>
        </Page>
      </AppFrame>
    );
  }
}

export default withStyles(styles)(MakeBoxMockupPage);
