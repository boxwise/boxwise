import React from "react";
import { connect } from "react-redux";
import ProductTable from "./ProductTable";
import { FirestoreCollection } from "react-firestore";
import { firestore } from "../firebase";
import { handleError } from "../utils";

class ProductTableContainer extends React.Component {
  state = {
    confirmDeleteOpen: false,
    confirmDeleteProductId: null
  };
  render() {
    const { profile } = this.props;
    if (profile.isFetching) {
      return <ProductTable isLoading={true} products={[]} />;
    }
    return (
      <FirestoreCollection
        path="products"
        filter={[
          ["organization", "==", firestore.doc(profile.organization.ref)],
          ["isDeleted", "==", false]
        ]}
        render={({ isLoading, data }) => {
          return (
            <ProductTable
              isLoading={isLoading}
              products={data}
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
          );
        }}
      />
    );
  }
}

export default connect(state => ({
  profile: state.profile
}))(ProductTableContainer);
