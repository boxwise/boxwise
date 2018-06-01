/* eslint-disable */

import React from "react";
import AppFrame from "../components/AppFrame";
import Page from "../components/Page";
import AddBoxDialogContainer from "../components/AddBoxDialogContainer";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import BoxListContainer from "../components/BoxListContainer";

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

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  categorySelect: {
    float: "left",
    backgroundColor: "#eee",
    width: 85,
    height: 85,
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

class FindBoxMockupPage extends React.Component {
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
      <AppFrame title="Find a box">
        <Page>
          <Grid container className={classes.root} xs={12} sm={9} md={7}>
            <Paper className={classes.paper}>
              <Typography variant="subheading" paragraph>
                Choose a product category
              </Typography>
              <CategorySelector />
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subheading" paragraph>
                Current category:
              </Typography>
              <ProductButton icon="male" label="Man" />
              <div style={{ clear: "both" }} />
              <Typography variant="subheading" paragraph>
                Choose a product
              </Typography>
              <ProductSelector />
            </Paper>

            <Paper className={classes.paper}>
              <ProductButton icon="male" label="Man" />
              <ProductButton icon="tshirt" label="T-Shirt" />
              <List style={{ clear: "both", maxHeight: 400, overflow: "auto" }}>
                <ListItem disableGutters divider>
                  <ListItemText
                    primary="166035 T-Shirts / Men / 20x"
                    secondary="Available / New shirts donated by Mango"
                  />
                  <Checkbox tabIndex={-1} />
                </ListItem>
                <ListItem disableGutters divider>
                  <ListItemText
                    primary="197456 T-Shirts / Men / 36x"
                    secondary="Available / New shirts donated by Mango"
                  />
                  <Checkbox tabIndex={-1} />
                </ListItem>
                <ListItem disableGutters divider>
                  <ListItemText primary="239236 T-Shirts / Men / 33x" />
                  <Checkbox tabIndex={-1} />
                </ListItem>
                <ListItem disableGutters divider>
                  <ListItemText
                    primary="166035 T-Shirts / Men / 20x"
                    secondary="Available / New shirts donated by Mango"
                  />
                  <Checkbox tabIndex={-1} />
                </ListItem>
                <ListItem disableGutters divider>
                  <ListItemText
                    primary="197456 T-Shirts / Men / 36x"
                    secondary="Available / New shirts donated by Mango"
                  />
                  <Checkbox tabIndex={-1} />
                </ListItem>
                <ListItem disableGutters divider>
                  <ListItemText primary="239236 T-Shirts / Men / 33x" />
                  <Checkbox tabIndex={-1} />
                </ListItem>
                <ListItem disableGutters divider>
                  <ListItemText
                    primary="166035 T-Shirts / Men / 20x"
                    secondary="Available / New shirts donated by Mango"
                  />
                  <Checkbox tabIndex={-1} />
                </ListItem>
                <ListItem disableGutters divider>
                  <ListItemText
                    primary="197456 T-Shirts / Men / 36x"
                    secondary="Available / New shirts donated by Mango"
                  />
                  <Checkbox tabIndex={-1} />
                </ListItem>
                <ListItem disableGutters divider>
                  <ListItemText primary="239236 T-Shirts / Men / 33x" />
                  <Checkbox tabIndex={-1} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Page>
      </AppFrame>
    );
  }
}

FindBoxMockupPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FindBoxMockupPage);
