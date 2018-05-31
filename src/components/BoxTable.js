import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  table: {
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

const BoxTable = ({ classes, isLoading, boxes, products }) => {
  if (isLoading) {
    return (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={classes.tableWrapper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {boxes.map(box => (
            <TableRow key={box.id}>
              <TableCell>
                {
                  products.filter(product => product.id === box.product.id)[0]
                    .category
                }
              </TableCell>
              <TableCell>
                {
                  products.filter(product => product.id === box.product.id)[0]
                    .name
                }
              </TableCell>
              <TableCell>{box.quantity}</TableCell>
              <TableCell>{box.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(BoxTable);
