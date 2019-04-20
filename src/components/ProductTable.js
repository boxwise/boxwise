import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import EditProductDialog from "containers/components/EditProductDialog";
import ProductDeleteConfirm from "containers/components/ProductDeleteConfirm.js";

import Progress from "./Progress.js";

const styles = theme => ({
  root: {
    overflowX: "auto"
  },
  table: {
    marginBottom: theme.spacing.unit * 4,
    width: "100%"
  },
  progress: {
    margin: theme.spacing.unit * 4,
    display: "flex",
    justifyContent: "center"
  }
});

export default withStyles(styles)(
  class extends PureComponent {
    state = {
      selectedProduct: null
    };

    componentDidMount() {
      this.props.productList();
    }

    render() {
      const {
        classes,
        products: { loading, data },
        productDeleteConfirm
      } = this.props;

      const isLoading = loading || !data;
      const { selectedProduct } = this.state;

      return (
        <div className={classes.root}>
          <ProductDeleteConfirm text="If you delete this product, the boxes that reference it will not be deleted. But, some stuff might stop working." />
          {isLoading ? (
            <Progress />
          ) : (
            <Table className={classes.table}>
              <EditProductDialog
                open={!!selectedProduct}
                product={selectedProduct}
                onClose={() => this.setState({ selectedProduct: null })}
              />
              <TableHead>
                <TableRow>
                  <TableCell padding="dense">Category</TableCell>
                  <TableCell padding="dense">Name</TableCell>
                  <TableCell padding="dense" />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((product, idx) => (
                  <TableRow key={idx}>
                    <TableCell padding="dense">{product.category}</TableCell>
                    <TableCell padding="dense">{product.name}</TableCell>
                    <TableCell padding="dense">
                      <IconButton
                        onClick={() =>
                          this.setState({ selectedProduct: product })
                        }
                        aria-label="Edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => productDeleteConfirm(product.id)}
                        aria-label="Delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      );
    }
  }
);
