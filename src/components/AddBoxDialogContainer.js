import React from "react";
import { connect } from "react-redux";
import AddBoxDialog from "./AddBoxDialog";
import { FirestoreCollection } from "react-firestore";
import { firestore } from "../firebase";

const DEFAULT_STATE = {
  box: null,
  done: false
};

class AddBoxDialogContainer extends React.Component {
  state = DEFAULT_STATE;

  reset = () => {
    this.setState(DEFAULT_STATE);
  };

  render() {
    const { onClose, profile, ...props } = this.props;

    if (profile.isFetching) {
      return <AddBoxDialog isLoading={true} products={[]} />;
    }
    return (
      <FirestoreCollection
        path="products"
        filter={["organization", "==", firestore.doc(profile.organization.ref)]}
        render={({ data }) => {
          return (
            <AddBoxDialog
              isLoading={false}
              products={data}
              done={this.state.done}
              box={this.state.box}
              selectedProduct={this.state.selectedProduct}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                values.organization = firestore.doc(profile.organization.ref);
                values.product = firestore.doc("products/" + values.product);
                firestore
                  .collection("boxes")
                  .add(values)
                  .then(ref => {
                    return ref.get();
                  })
                  .then(box => {
                    setSubmitting(false);
                    this.setState({
                      box: box.data(),
                      selectedProduct: data.filter(
                        product => product.id === values.product.id
                      )[0],
                      done: true
                    });
                  })
                  .catch(e => {
                    setSubmitting(false);
                    console.error();
                  });
              }}
              onClose={() => {
                this.reset();
                onClose();
              }}
              onReset={this.reset}
              {...props}
            />
          );
        }}
      />
    );
  }
}

export default connect(state => ({
  profile: state.profile
}))(AddBoxDialogContainer);
