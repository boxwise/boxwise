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

const styles = theme => ({
  logo: {
    height: 50,
    marginBottom: 10
  },
  categorySelect: {
    float: "left",
    backgroundColor: "#eee",
    width: 90,
    height: 90,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  categoryIcon: {
    fontSize: 35,
    textAlign: "center",
    color: "009BD9"
  },
  categoryTitle: {
    textAlign: "center"
  },
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
  paper: {
    padding: 16,
    marginTop: theme.spacing.unit * 3,
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
        <Paper className={classes.paper}>
          <img src="/images/dropapp.svg" className={classes.logo} />
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
          <Button variant="raised" color="secondary">
            Next step
          </Button>
        </Paper>

        <Paper className={classes.paper}>
          <img src="/images/dropapp.svg" className={classes.logo} />
          <Typography variant="headline" paragraph="true">
            Make a new box
          </Typography>
          <Typography variant="subheading" paragraph="true">
            Choose a product category for this box
          </Typography>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-male" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Man
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-female" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Woman
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-male" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Adult
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-child" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Boy
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-child" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Girl
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-child" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Child
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-child" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Baby
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography className={classes.categoryIcon}>
              <i className="fas fa-shower" />
            </Typography>
            <Typography className={classes.categoryTitle}>Hygiene</Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-utensils" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Food
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-ellipsis-v" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Other
            </Typography>
          </ButtonBase>
        </Paper>

        <Paper className={classes.paper}>
          <img src="/images/dropapp.svg" className={classes.logo} />
          <Typography variant="headline" paragraph="true">
            Make a new box
          </Typography>
          <Typography variant="subheading" paragraph="true">
            Choose a product for this box
          </Typography>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-tshirt" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              T-Shirt
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-tshirt" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Sweater
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-tshirt" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Trousers
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-tshirt" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Socks
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.categorySelect}>
            <Typography component="p" className={classes.categoryIcon}>
              <i className="fas fa-tshirt" />
            </Typography>
            <Typography component="p" className={classes.categoryTitle}>
              Shoes
            </Typography>
          </ButtonBase>
        </Paper>
      </Grid>
    );
  }
}

MakeBoxUIPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MakeBoxUIPage);
