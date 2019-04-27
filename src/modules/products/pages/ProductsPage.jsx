import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { Page, AppFrame } from "modules/layout/components";

import ProductTable from "../containers/ProductTable";
import AddProductDialog from "../containers/AddProductDialog";

const ProductsPage = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const handleDialogClose = () => setAddDialogOpen(false);
  const handleDialogOpen = () => setAddDialogOpen(true);
  return (
    <AppFrame title="Manage products">
      <Page>
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

export default ProductsPage;
