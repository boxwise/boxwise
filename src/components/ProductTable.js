import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Progress from "./Progress.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDeleteAlert from "./ConfirmDeleteAlert";
import EditProductDialogContainer from "../components/EditProductDialogContainer";

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

class ProductTable extends React.Component {
  state = {
    editProduct: null
  };

  render = () => {
    const {
      classes,
      isLoading,
      products,
      onDelete,
      onCancelConfirmDelete,
      onConfirmDelete,
      confirmDeleteOpen
    } = this.props;

    return (
      <div className={classes.root}>
        <ConfirmDeleteAlert
          text="If you delete this product, the boxes that reference it will not be deleted. But, some stuff might stop working."
          open={confirmDeleteOpen}
          onConfirm={onConfirmDelete}
          onCancel={onCancelConfirmDelete}
        />
        {isLoading ? (
          <Progress />
        ) : (
          <Table className={classes.table}>
            <EditProductDialogContainer
              open={!!this.state.editProduct}
              product={this.state.editProduct}
              onClose={() => this.setState({ editProduct: null })}
            />
            <TableHead>
              <TableRow>
                <TableCell padding="dense">Category</TableCell>
                <TableCell padding="dense">Name</TableCell>
                <TableCell padding="dense" />
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(product => {
                return (
                  <TableRow key={product.id}>
                    <TableCell padding="dense">{product.category}</TableCell>
                    <TableCell padding="dense">{product.name}</TableCell>
                    <TableCell padding="dense">
                      <IconButton
                        onClick={() => this.setState({ editProduct: product })}
                        aria-label="Edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => onDelete(product.id)}
                        aria-label="Delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    );
  };
}

export default withStyles(styles)(ProductTable);
