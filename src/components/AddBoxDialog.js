import React, { PureComponent } from "react";
import { bool, func } from "prop-types";
import Dialog from "@material-ui/core/Dialog";

import { ProductsCollection } from "../queries/products";

import AddBoxForm from "./AddBoxForm";
import AddBoxDone from "./AddBoxDone";

export default class AddBoxDialogContainer extends PureComponent {
  static propTypes = {
    open: bool.isRequired,
    onClose: func
  };

  state = {
    box: null,
    selectedProduct: null,
    done: false
  };

  _reset() {
    this.setState({ box: null, selectedProduct: null, done: false });
  }

  _onSubmit(values, { setSubmitting, setErrors }) {
    const selectedProduct = JSON.parse(values.product);
    const { profile, addBox } = this.props;
    const { organization } = profile.data;

    setSubmitting(true);
    addBox({
      ...values,
      organization,
      product: selectedProduct,
      profile: profile.data
    }).then(({ error, data }) => {
      setSubmitting(false);
      error
        ? setErrors(error)
        : this.setState({
            box: data,
            done: true,
            selectedProduct:
              selectedProduct.category + " / " + selectedProduct.name
          });
    });
  }

  _onClose() {
    const { onClose } = this.props;
    this._reset();
    onClose && onClose();
  }

  _renderDialog(products) {
    const { box, selectedProduct, done } = this.state;

    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this._onClose.bind(this)}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        {done ? (
          <AddBoxDone
            box={box}
            selectedProduct={selectedProduct}
            onClose={this._onClose.bind(this)}
            onReset={this._reset.bind(this)}
          />
        ) : (
          <AddBoxForm
            products={products}
            onClose={this._onClose.bind(this)}
            onSubmit={this._onSubmit.bind(this)}
          />
        )}
      </Dialog>
    );
  }

  render() {
    const { profile } = this.props;

    if (profile.loading || !profile) {
      return null; // TODO: Add a loading spinner
    }

    const { organization } = profile.data;
    return (
      <ProductsCollection
        organizationRef={organization.ref}
        render={({ data }) => this._renderDialog(data)}
      />
    );
  }
}
