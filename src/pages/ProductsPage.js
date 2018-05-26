import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import AddProductDialog from "../components/AddProductDialog";
import AppFrame from "../components/AppFrame";
import Page from "../components/Page";

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
    const { classes, products } = this.props;
    return (
      <AppFrame title="Products">
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
            {!isLoaded(products) ? (
              <div className={classes.progress}>
                <CircularProgress />
              </div>
            ) : (
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell numeric>Items</TableCell>
                      <TableCell numeric>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map(n => {
                      return (
                        <TableRow key={n.id}>
                          <TableCell component="th" scope="row">
                            {n.name}
                          </TableCell>
                          <TableCell>{n.description}</TableCell>
                          <TableCell numeric>0</TableCell>
                          <TableCell numeric>{n.price}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </Paper>
        </Page>
      </AppFrame>
    );
  }
}

export default compose(
  firestoreConnect(["products"]),
  connect(state => ({
    products: state.firestore.ordered.products
  })),
  withStyles(styles)
)(ProductsPage);
