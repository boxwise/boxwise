import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const BoxTable = ({ boxes }) => (
  <Table>
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
);

export default BoxTable;
