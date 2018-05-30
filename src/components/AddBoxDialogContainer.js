import React from "react";
import AddBoxDialog from "./AddBoxDialog";
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
    const { onClose, ...props } = this.props;
    return (
      <AddBoxDialog
        done={this.state.done}
        box={this.state.box}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          firestore
            .collection("boxes")
            .add(values)
            .then(ref => {
              return ref.get();
            })
            .then(box => {
              setSubmitting(false);
              this.setState({ box: box.data(), done: true });
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
  }
}

export default AddBoxDialogContainer;
