import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDeleteAlert from "./ConfirmDeleteAlert";

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

const ProductTable = ({
  classes,
  isLoading,
  products,
  onDelete,
  onCancelConfirmDelete,
  onConfirmDelete,
  confirmDeleteOpen
}) => {
  return (
    <div className={classes.root}>
      <ConfirmDeleteAlert
        text="If you delete this product, the boxes that reference it will not be deleted. But, some stuff might stop working."
        open={confirmDeleteOpen}
        onConfirm={onConfirmDelete}
        onCancel={onCancelConfirmDelete}
      />
      {isLoading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : (
        <Table className={classes.table}>
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

export default withStyles(styles)(ProductTable);
