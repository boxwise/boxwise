import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import AppFrame from "components/AppFrame";
import Page from "components/Page";

import ProductTable from "../containers/ProductTable";
import AddProductDialog from "../containers/AddProductDialog";

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

const ProductsPage = ({ classes }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const handleDialogClose = () => setAddDialogOpen(false);
  const handleDialogOpen = () => setAddDialogOpen(true);
  return (
    <AppFrame title="Manage products">
      <Page className={classes.root}>
        <AddProductDialog open={addDialogOpen} onClose={handleDialogClose} />
        <Paper>
          <Toolbar>
            <Button color="primary" onClick={handleDialogOpen}>
              Add Product
            </Button>
          </Toolbar>
          <ProductTable />
        </Paper>
      </Page>
    </AppFrame>
  );
};

export default withStyles(styles)(ProductsPage);
