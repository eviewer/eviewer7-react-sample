import React, { Component, useState } from "react";
import App from "./App";
import ReactDOM from "react-dom";
import eViewerApp from "eviewerjs/js/eViewer7.js";
import Form from "./form";

class InitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      isChecked: true,
      userName: "demo user",
      licenseKey:
        "QX0ZUhau5qt0HBLnDQ5XcL+Ih625vvsKCk3fjacNqa/3+F6sDkQFUkso2z6Fi9z/w7MhHwhp0K7q0eX/agSjfY/q9HOBHnr7f4TY81KZosgmOKn0PnHHc0te9+Ps4anZ8G0Ub1lsIO2vL6CNpB5yjHeWY1E+0M7GFQYdtXowd4brMwfESdAvLEPibII77mwVmNvGzyEzNUpX1Krknne2vJzI8+jKs93zu0ADdxPUz1aPqeTTVhwokyPx6aE5aMQJA7/vTBJiIha4h7YX3oWjhspTeBObRRSMIvH/iKYqZJeMIA3pNj+7WD9W1cqnuvvScErUKbzOzGCD/Za9y9GPrRY3HcpxWoyhaKivjdRdUOAn/lx2onD8VIxwKoPJJgck16IHK2kqmwpz2CEk3LbM/hpW2bLWaQ1eaqA31gb5yWneUiIpnHKvLCnf+xrQk/235nMbpmsCyh6X5DAs4w2n7RzrHME67rpu7rIBOL/LZj4=",
      viewerServerURL: "",
    };
  }

  showForm = () => {
    return (
      <Form
        licenseKey={this.state.licenseKey}
        overrideCtxMenu={this.state.isChecked}
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
            Override Right Click Contenxt Menu
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
