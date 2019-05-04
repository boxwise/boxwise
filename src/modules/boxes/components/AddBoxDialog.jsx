import React, { PureComponent } from "react";
import Dialog from "@material-ui/core/Dialog";

import { ProductsCollection } from "modules/products/components";

import AddBoxForm from "./AddBoxForm";
import AddBoxDone from "./AddBoxDone";

const getInitialState = () => {
  return {
    box: null,
    selectedProduct: null,
    done: false,
    serverError: null
  };
};

export default class AddBoxDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = getInitialState();
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleReset() {
    this.setState(getInitialState);
  }

  handleSubmit(values) {
    const selectedProduct = JSON.parse(values.product);
    const { profile, addBox } = this.props;
    const { organization } = profile.data;

    addBox({
      ...values,
      organization,
      product: selectedProduct,
      profile: profile.data
    }).then(({ error, data }) => {
      if (error) this.setState({ serverError: error });
      else
        this.setState({
          box: data,
          done: true,
          selectedProduct: `${selectedProduct.category} / ${
            selectedProduct.name
          }`
        });
    });
  }

  handleClose() {
    const { onClose } = this.props;
    this.handleReset();
    if (onClose) onClose();
  }

  renderDialog(products) {
    const { box, selectedProduct, done, serverError } = this.state;
    const { open } = this.props;

    return (
      <Dialog
        fullScreen
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        {done ? (
          <AddBoxDone
            box={box}
            selectedProduct={selectedProduct}
            onClose={this.handleClose}
            onReset={this.handleReset}
          />
        ) : (
          <AddBoxForm
            products={products}
            onClose={this.handleClose}
            onSubmit={this.handleSubmit}
            serverError={serverError}
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
        render={({ data }) => this.renderDialog(data)}
      />
    );
  }
}
