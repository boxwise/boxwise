import React from "react";
import ProductTable from "./ProductTable";

export default class ProductTableWrapper extends React.Component {
  state = {
    selectedProduct: null
  };

  componentDidMount() {
    this.props.productList();
  }

  render() {
    const {
      products: { loading, data },
      productDeleteConfirm
    } = this.props;
    const { selectedProduct } = this.state;

    return (
      <ProductTable
        isLoading={!data || loading}
        products={data}
        onClose={() => this.setState({ selectedProduct: null })}
        currentProduct={selectedProduct}
        onEdit={selectedProduct => this.setState({ selectedProduct })}
        onDelete={productDeleteConfirm}
      />
    );
  }
}
