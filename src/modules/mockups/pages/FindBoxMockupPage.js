import React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import { Page, AppFrame } from "modules/layout/components";

import ProductButton from "../components/ProductButton";
import ProductSelectorMockup from "../components/ProductSelectorMockup";
import CategorySelector from "../components/CategorySelector";

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

    return (
      <AppFrame title="Find a box">
        <Page>
          <Grid container className={classes.root} xs={12} sm={9} md={7}>
            <Paper className={classes.paper}>
              <Typography variant="subtitle1" paragraph>
                Choose a product category
              </Typography>
              <CategorySelector />
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subtitle1" paragraph>
                Current category:
              </Typography>
              <ProductButton icon="male" label="Man" />
              <div style={{ clear: "both" }} />
              <Typography variant="subtitle1" paragraph>
                Choose a product
              </Typography>
              <ProductSelectorMockup />
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

export default withStyles(styles)(FindBoxMockupPage);
