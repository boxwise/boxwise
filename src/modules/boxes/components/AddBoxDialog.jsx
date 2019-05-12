import React, { PureComponent } from "react";
import Dialog from "@material-ui/core/Dialog";

import AddBoxDone from "../containers/AddBoxDone";

import AddBoxForm from "./AddBoxForm";

const getInitialState = () => {
  return {
    boxId: null,
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

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  handleReset() {
    this.setState(getInitialState);
  }

  handleSubmit(values) {
    const { addBox } = this.props;

    addBox(values).then(({ payload }) => {
      this.setState({ boxId: payload.id, done: true });
    });
  }

  handleClose() {
    const { onClose } = this.props;
    this.handleReset();
    if (onClose) onClose();
  }

  render() {
    const { boxId, done } = this.state;
    const { open, products, serverError } = this.props;

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
            boxId={boxId}
            onClose={this.handleClose}
            onReset={this.handleReset}
          />
        ) : (
          <AddBoxForm
            products={products.data}
            onClose={this.handleClose}
            onSubmit={this.handleSubmit}
            serverError={serverError}
          />
        )}
      </Dialog>
    );
  }
}
