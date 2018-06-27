import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import AppFrame from "../components/AppFrame";
import Page from "../components/Page";
import ProductTableWrapper from "../containers/components/ProductTableWrapper";
import AddProductDialog from "../containers/components/AddProductDialog";

const styles = theme => ({
  table: {
    minWidth: 700,
    marginBottom: theme.spacing.unit * 4
  },
  tableWrapper: {
    overflowX: "auto"
  },
  progress: {
    margin: theme.spacing.unit * 4,
    display: "flex",
    justifyContent: "center"
  }
});

class ProductsPage extends React.Component {
  state = {
    addDialogOpen: false
  };

  render() {
    const { classes } = this.props;
    return (
      <AppFrame title="Manage products">
        <Page className={classes.root}>
          <AddProductDialog
            open={this.state.addDialogOpen}
            onClose={() => this.setState({ addDialogOpen: false })}
          />
          <Paper>
            <Toolbar>
              <Button
                color="primary"
                onClick={() => this.setState({ addDialogOpen: true })}
              >
                Add Product
              </Button>
            </Toolbar>
            <ProductTableWrapper />
          </Paper>
        </Page>
      </AppFrame>
    );
  }
}

export default withStyles(styles)(ProductsPage);
