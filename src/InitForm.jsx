import React, { Component, useState } from "react";
import App from "./App";
import ReactDOM from "react-dom";
import eViewerApp from "@mstechusa/eviewer7/js/eViewer7.js";
import Form from "./form";

window.inputFieldDirectionSet = false;
class InitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      isThumbnailIndicatorChecked: true,
      operationPerformUsingRegExField: true,
      isRightClickContextMenuChecked: true,
      isDocumentumConnectorChecked: false,
      isEnableSHortcutKeysWithoutClick: true,
      userName: "demo user",
      contentSecurity: "",
      licenseKey: "PROVIDED BY MST",
      viewerServerURL: "",
    };
  }

  showForm = () => {
    return (
      <Form
        licenseKey={this.state.licenseKey}
        overrideCtxMenu={this.state.isRightClickContextMenuChecked}
        overrideThumbIndicator={this.state.isThumbnailIndicatorChecked}
        overrideEnableHyperLink={this.state.operationPerformUsingRegExField}
        useDocumentumConnector= {this.state.isDocumentumConnectorChecked}
        userName={this.state.userName}
        viewerServerURL={this.state.viewerServerURL}
        contentSecurity={this.state.contentSecurity}
        enableShortcutWithoutClick = {this.state.isEnableSHortcutKeysWithoutClick}
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

  handleContentSecurity = (event) => {
    this.setState({
      contentSecurity: event.target.value,
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
      isRightClickContextMenuChecked:
        !this.state.isRightClickContextMenuChecked,
    });
  };

  toggleEnableShortcutWithoutClick = () => {
    this.setState({
      isEnableSHortcutKeysWithoutClick:
        !this.state.isEnableSHortcutKeysWithoutClick
    });
  };

  toggleOverrideThumbIndicatorOverride = () => {
    this.setState({
      isThumbnailIndicatorChecked: !this.state.isThumbnailIndicatorChecked,
    });
  };

  toggleDocumentumConnector = () => {
    this.setState({
      isDocumentumConnectorChecked: !this.state.isDocumentumConnectorChecked,
    });
  }

  toggleOverrideEnableHyperLink = () => {
    this.setState({
      operationPerformUsingRegExField:
        !this.state.operationPerformUsingRegExField,
    });
  };

  showInitForm = () => {
    if (!window.inputFieldDirectionSet && navigator.language.includes("ar")) {
      setTimeout(this.inputFieldDirectionSetMethod);
    }
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
          <input
            type="text"
            className="form-control form-control-sm"
            name="Content Security Policy"
            value={this.state.contentSecurity}
            onChange={this.handleContentSecurity}
            placeholder="Content Security Policy"
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={this.state.isRightClickContextMenuChecked}
              onChange={this.toggleOverrideCtxMenu}
            />
            Override Right Click Context Menu
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={this.state.isThumbnailIndicatorChecked}
              onChange={this.toggleOverrideThumbIndicatorOverride}
            />
            Override Thumbnail Indicator
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={this.state.isDocumentumConnectorChecked}
              onChange={this.toggleDocumentumConnector}
            />
            Use Documentum Connector
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={this.state.operationPerformUsingRegExField}
              onChange={this.toggleOverrideEnableHyperLink}
            />
            Override Enable HyperLinks
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={this.state.isEnableSHortcutKeysWithoutClick}
              onChange={this.toggleEnableShortcutWithoutClick}
            />
            Enable Shortcut keys over Viewer
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

  inputFieldDirectionSetMethod() {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach((input) => {
      input.dir = "rtl";
    });
    this.inputFieldDirectionSet = true;
  }
  render() {
    return (
      <div>{this.state.showForm ? this.showForm() : this.showInitForm()}</div>
    );
  }
}

export default InitForm;
