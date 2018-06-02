import React from "react";
import BoxList from "./BoxList";
import { connect } from "react-redux";
import { FirestoreCollection } from "react-firestore";
import { firestore } from "../firebase";

class BoxListContainer extends React.Component {
  state = {
    selectedProductFilter: ""
  };

  render() {
    const { profile } = this.props;
    if (profile.isFetching) {
      return <BoxList isLoading={true} boxes={[]} />;
    }
    let filters = [
      ["organization", "==", firestore.doc(profile.organization.ref)]
    ];
    if (this.state.selectedProductFilter) {
      filters.push([
        "product",
        "==",
        firestore.doc(`products/${this.state.selectedProductFilter}`)
      ]);
    }

    return (
      <FirestoreCollection
        path="boxes"
        filter={filters}
        sort="humanID:asc"
        render={boxresult => {
          return (
            <FirestoreCollection
              path="products"
              filter={[
                ["organization", "==", firestore.doc(profile.organization.ref)],
                ["isDeleted", "==", false]
              ]}
              render={productresult => {
                return (
                  <BoxList
                    isLoading={boxresult.isLoading || productresult.isLoading}
                    boxes={boxresult.data}
                    products={productresult.data}
                    selectedProductFilter={this.state.selectedProductFilter}
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
