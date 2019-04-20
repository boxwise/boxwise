import React from "react";
import { connect } from "react-redux";
import { FirestoreCollection } from "react-firestore";

import { ProductsCollection } from "queries/products";
import { firestore } from "firebase.js";

import BoxList from "./BoxList";

class BoxListContainer extends React.Component {
  state = {
    selectedProductFilter: ""
  };

  render() {
    const { profile } = this.props;
    const { selectedProductFilter } = this.state;

    if (profile.loading) {
      return <BoxList isLoading={true} boxes={[]} />;
    }
    const { organization } = profile.data;

    let filters = [["organization", "==", firestore.doc(organization.ref)]];
    if (selectedProductFilter) {
      filters.push([
        "product",
        "==",
        firestore.doc(`products/${selectedProductFilter}`)
      ]);
    }

    return (
      <FirestoreCollection
        path="boxes"
        filter={filters}
        sort="humanID:asc"
        render={boxresult => {
          return (
            <ProductsCollection
              organizationRef={organization.ref}
              render={productresult => {
                return (
                  <BoxList
                    isLoading={boxresult.isLoading || productresult.isLoading}
                    boxes={boxresult.data}
                    products={productresult.data}
                    selectedProductFilter={selectedProductFilter}
                    onChangeProductFilter={value =>
                      this.setState({ selectedProductFilter: value })
                    }
                  />
                );
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
}))(BoxListContainer);
