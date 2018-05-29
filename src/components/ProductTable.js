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

const ProductTable = ({ classes, isLoading, products }) => {
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
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell>{n.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(ProductTable);
