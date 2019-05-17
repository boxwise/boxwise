import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Tooltip from "@material-ui/core/Tooltip";
import TableRow from "@material-ui/core/TableRow";
import Snackbar from "@material-ui/core/Snackbar";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import Progress from "components/Progress";
import ConfirmationButton from "components/ConfirmationButton";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const ProductList = ({
  products: { loading, data },
  location,
  history,
  deleteProduct,
  getAllProducts,
  classes
}) => {
  const hideMessage = () => {
    history.replace({ ...location.pathname, state: undefined });
  };
  useEffect(() => {
    // TODO: instead of loading every time this page loads, we should find a way to
    // subscribe to products in firebase and keep them locally
    getAllProducts();
  }, [getAllProducts]);

  return (
    <React.Fragment>
      {loading && <Progress />}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="dense">Category</TableCell>
            <TableCell padding="dense">Name</TableCell>
            <TableCell padding="dense" />
          </TableRow>
        </TableHead>
        <TableBody data-testid="productsTableBody">
          {data.map(product => (
            <TableRow key={product.id}>
              <TableCell padding="dense">{product.category}</TableCell>
              <TableCell padding="dense" data-testid="productNameCell">
                {product.name}
              </TableCell>
              <TableCell padding="dense">
                <IconButton
                  component={Link}
                  to={`/products/edit/${product.id}`}
                  aria-label="Edit"
                  data-testid="editProductButton"
                >
                  <EditIcon />
                </IconButton>
                <ConfirmationButton
                  confirmationAction="Delete"
                  confirmationText="Are you sure you want to delete this product?"
                  onConfirm={() => deleteProduct(product.id)}
                  dataTestId="deleteProduct"
                >
                  <DeleteIcon />
                </ConfirmationButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Tooltip title="Add product" aria-label="Add">
        <Fab
          color="secondary"
          className={classes.fab}
          data-testid="addProductButton"
          component={Link}
          to="/products/add"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        onClose={hideMessage}
        open={location.state && location.state.message !== undefined}
        autoHideDuration={4000}
        message={location.state && location.state.message}
      />
    </React.Fragment>
  );
};

export default withRouter(withStyles(styles)(ProductList));
