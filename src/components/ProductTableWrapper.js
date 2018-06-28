import React from "react";
import ProductTable from "./ProductTable";
import { ProductsCollection } from "../queries/products";

export default class ProductTableWrapper extends React.Component {
  state = {
    selectedProduct: null
  };
  render() {
    const { profile, productDeleteConfirm } = this.props;
    const { selectedProduct } = this.state;

    if (profile.loading) {
      return <ProductTable isLoading={true} products={[]} />;
    }
    const { organization } = profile.data;

    return (
      <ProductsCollection
        organizationRef={organization.ref}
        render={({ isLoading, data }) => {
          return (
            <ProductTable
              isLoading={isLoading}
              products={data}
              onClose={() => this.setState({ selectedProduct: null })}
              currentProduct={selectedProduct}
              onEdit={selectedProduct => this.setState({ selectedProduct })}
              onDelete={productDeleteConfirm}
            />
          );
        }}
      />
    );
  }
}
