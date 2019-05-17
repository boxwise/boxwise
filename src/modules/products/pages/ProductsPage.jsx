import React from "react";

import { AppFrame, Page } from "modules/layout/components";

import ProductList from "../components/ProductListContainer";

const ProductsPage = () => {
  return (
    <AppFrame title="Manage products">
      <Page>
        <ProductList />
      </Page>
    </AppFrame>
  );
};

export default ProductsPage;
