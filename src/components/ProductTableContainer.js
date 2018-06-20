import React from "react";
import { connect } from "react-redux";
import ProductTable from "./ProductTable";
import { ProductsCollection, ProductsCount } from "../queries/products";
import { firestore } from "../firebase";
import { handleError } from "../utils";

class ProductTableContainer extends React.Component {
  state = {
    confirmDeleteOpen: false,
    confirmDeleteProductId: null
  };
  render() {
    const { profile } = this.props;
    if (profile.loading) {
      return <ProductTable isLoading={true} products={[]} />;
    }
    const { organization } = profile.data;

    return (
      <ProductsCollection
        organizationRef={organization.ref}
        render={({ isLoading: isProductsLoading, data: products }) => (
          <ProductsCount
            organizationRef={organization.ref}
            render={({ isLoading: isCountsLoading, data: counts }) => (
              <ProductTable
                isProductsLoading={isProductsLoading}
                products={products}
                isCountsLoading={isCountsLoading}
                counts={counts}
                onDelete={id => {
                  this.setState({
                    confirmDeleteOpen: true,
                    confirmDeleteProductId: id
                  });
                }}
                confirmDeleteOpen={this.state.confirmDeleteOpen}
                onConfirmDelete={() => {
                  firestore
                    .collection("products")
                    .doc(this.state.confirmDeleteProductId)
                    .update({ isDeleted: true })
                    .catch(handleError);

                  this.setState({
                    confirmDeleteOpen: false,
                    confirmDeleteProductId: null
                  });
                }}
                onCancelConfirmDelete={() => {
                  this.setState({
                    confirmDeleteOpen: false,
                    confirmDeleteProductId: null
                  });
                }}
              />
            )}
          />
        )}
      />
    );
  }
}

export default connect(state => ({
  profile: state.profile
}))(ProductTableContainer);
