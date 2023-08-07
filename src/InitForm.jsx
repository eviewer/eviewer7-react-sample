import React, { Component, useState } from "react";
import App from "./App";
import ReactDOM from "react-dom";
import eViewerApp from "@mstechusa/eviewer7/js/eViewer7.js";
import Form from "./form";

class InitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      isChecked: true,
      userName: "demo user",
      licenseKey: "PROVIDED BY MST",
      viewerServerURL: "",
    };
  }

  showForm = () => {
    return (
      <Form
        licenseKey={this.state.licenseKey}
        overrideCtxMenu={this.state.isChecked}
        overrideThumbIndicator={this.state.isChecked}
        userName={this.state.userName}
        viewerServerURL={this.state.viewerServerURL}
      />
    );
  };

  handleSubmit = (event) => {
    this.setState({ showForm: true });
  };

  handleInputUserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  handleInputLicenseKey = (event) => {
    this.setState({
      licenseKey: event.target.value,
    });
  };

  handleInputviewerServerURL = (event) => {
    this.setState({
      viewerServerURL: event.target.value,
    });
  };

  toggleOverrideCtxMenu = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  toggleOverrideThumbIndicatorOverride = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  showInitForm = () => {
    return (
      <div className="div-mst">
        {" "}
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-sm"
            name="viewerServerURL"
            value={this.state.viewerServerURL}
            onChange={this.handleInputviewerServerURL}
            placeholder="viewerServerURL"
          />
        </div>
        <div>
          <input
            type="text"
            className="form-control form-control-sm"
            name="License Key"
            value={this.state.licenseKey}
            onChange={this.handleInputLicenseKey}
            placeholder="License Key"
          />
        </div>
        <div>
          <input
            type="text"
            className="form-control form-control-sm"
            name="User Name"
            value={this.state.userName}
            onChange={this.handleInputUserName}
            placeholder="User Name"
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={this.state.isChecked}
              onChange={this.toggleOverrideCtxMenu}
            />
            Override Right Click Context Menu
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={this.state.isChecked}
              onChange={this.toggleOverrideThumbIndicatorOverride}
            />
            Override Thumbnail Indicator 
          </label>
        </div>
        <div>
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            Load Viewer
          </button>{" "}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>{this.state.showForm ? this.showForm() : this.showInitForm()}</div>
    );
  }
}

export default InitForm;
