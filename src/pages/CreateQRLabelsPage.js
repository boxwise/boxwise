import React from "react";
import "./CreateQRLabelsPage.css";
import { connect } from "react-redux";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class CreateQRLabelsPage extends React.Component {
  state = {
    addDialogOpen: false
  };

  render() {
    var i;
    var labels = [];
    for (i = 0; i < 104; i++) {
      labels[i] = i;
    }

    return (
      <div className="CreateQRLabelsPage">
        {labels.map(label => (
          <div className="label">
            <img
              src={
                "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" +
                uuidv4() +
                "&chld=L|0"
              }
              alt="qr code"
              className="qrcode"
            />
            <div className="name">IHA Warehouse</div>
            <div className="count">count</div>
            <div className="product">product</div>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(({ organisation }) => ({
  organisation: organisation
}))(CreateQRLabelsPage);
