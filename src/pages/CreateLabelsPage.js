import React from "react";
import "./CreateLabelsPage.css";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4";

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
            <div className="boxid">box number</div>
            <div className="count">count</div>
            <div className="product">product</div>
          </div>
        ))}
        <div className="infobox no-print">
          Print these labels on A4-sheets divided in a 2x2 layout. Use a Chrome
          browser to be sure that the layout prints well.<br />
          <br />
          <a href="/dashboard">Go back</a> or{" "}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  profile: state.profile
}))(CreateQRLabelsPage);
