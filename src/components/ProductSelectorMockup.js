import React from "react";

import ProductButton from "components/ProductButton";

const ProductSelectorMockup = () => {
  return (
    <div>
      <ProductButton icon="tshirt" label="T-Shirt" />
      <ProductButton icon="tshirt" label="Sweater" />
      <ProductButton icon="tshirt" label="Trousers" />
      <ProductButton icon="tshirt" label="Socks" />
      <ProductButton icon="tshirt" label="Shoes" />
    </div>
  );
};

export default ProductSelectorMockup;
