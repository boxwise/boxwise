import React from "react";
import "./CreateQRLabelsPage.css";

class CreateQRLabelsPage extends React.Component {
  state = {
    addDialogOpen: false
  };

  render() {
    let labels = ["foo", "bar"];
    return (
      <div className="CreateQRLabelsPage">
        {labels.map(label => <p>{label}</p>)}
      </div>
    );
  }
}

export default CreateQRLabelsPage;
