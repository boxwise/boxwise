import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  table: {
    minWidth: 700,
    marginBottom: theme.spacing.unit * 4
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const BoxTable = ({ classes, boxes }) => (
  <div className={classes.tableWrapper}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Number</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>Count</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {boxes.map(box => (
          <TableRow>
            <TableCell>{box.number}</TableCell>
            <TableCell>{box.product}</TableCell>
            <TableCell>{box.count}</TableCell>
            <TableCell>{box.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default withStyles(styles)(BoxTable);
