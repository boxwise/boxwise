import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import Progress from "components/Progress";
import DeleteButton from "components/DeleteButton";

import { productDelete, productList } from "../actions";
import { getAllProductsFromState } from "../reducer";

import EditProductDialog from "./EditProductDialog";

const styles = theme => ({
  root: {
    overflowX: "auto"
  },
  table: {
    marginBottom: theme.spacing.unit * 4,
    width: "100%"
  }
});

const ProductTable = ({
  classes,
  products: { loading, data },
  productDelete,
  productList
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    productList();
  }, [productList]);

  const isLoading = loading || !data;

  return (
    <div className={classes.root}>
      {isLoading ? (
        <Progress />
      ) : (
        <Table className={classes.table}>
          <EditProductDialog
            open={!!selectedProduct}
            productToEdit={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
          <TableHead>
            <TableRow>
              <TableCell padding="dense">Category</TableCell>
              <TableCell padding="dense">Name</TableCell>
              <TableCell padding="dense" />
            </TableRow>
          </TableHead>
          <TableBody data-cy="productsTableBody">
            {data.map(product => (
              <TableRow key={product.id}>
                <TableCell padding="dense">{product.category}</TableCell>
                <TableCell padding="dense" data-cy="productNameCell">
                  {product.name}
                </TableCell>
                <TableCell padding="dense">
                  <IconButton
                    onClick={() => setSelectedProduct(product)}
                    aria-label="Edit"
                    data-cy="editProductButton"
                  >
                    <EditIcon />
                  </IconButton>
                  <DeleteButton
                    confirmationText="If you delete this product, the boxes that reference it will not be deleted. But, some stuff might stop working."
                    onDelete={() => productDelete(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export const ProductTableWithStyles = withStyles(styles)(ProductTable);

export default connect(
  state => ({ products: getAllProductsFromState(state) }),
  { productDelete, productList }
)(ProductTableWithStyles);
