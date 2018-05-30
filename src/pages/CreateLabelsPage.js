import React from "react";
import "./CreateLabelsPage.css";
import { connect } from "react-redux";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class CreateQRLabelsPage extends React.Component {
  render() {
    const numberOfLabels = 104;
    if (this.props.profile.isFetching) {
      // TODO: loading spinner
      return <p>Loading</p>;
    }

    return (
      <div className="CreateLabelsPage">
        {[...Array(numberOfLabels)].map((_, i) => (
          <div className="label" key={i}>
            <img
              src={
                "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" +
                uuidv4() +
                "&chld=L|0"
              }
              alt="barcode"
              className="barcode"
            />
            <div className="name">{this.props.profile.organization.name}</div>
            <div className="count">count</div>
            <div className="product">product</div>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(state => ({
  profile: state.profile
}))(CreateQRLabelsPage);
