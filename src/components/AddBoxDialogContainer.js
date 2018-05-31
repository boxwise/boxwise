import React from "react";
import { connect } from "react-redux";
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
    const { onClose, profile, ...props } = this.props;
    return (
      <AddBoxDialog
        done={this.state.done}
        box={this.state.box}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          values.organization = firestore.doc(profile.organization.ref);
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

export default connect(state => ({
  profile: state.profile
}))(AddBoxDialogContainer);
