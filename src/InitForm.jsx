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
      isFilenetConnectorChecked: false,
      isEnableSHortcutKeysWithoutClick: true,
      isRegisterCallbackFunctions: true,
      userName: "demo user",
      contentSecurity: "",
      licenseKey: "PROVIDED BY MST",
      selectedTheme: "Default",
      viewerServerURL: "",
      freeVersion: "",
      isHideRibbonToolBar: false,
      isSkipLocationChange: false,
      selectedLanguage : "en"
    };
  }

  showForm = () => {
    return (
      <Form
        licenseKey={this.state.licenseKey}
        overrideCtxMenu={this.state.isRightClickContextMenuChecked}
        overrideThumbIndicator={this.state.isThumbnailIndicatorChecked}
        overrideEnableHyperLink={this.state.operationPerformUsingRegExField}
        useDocumentumConnector={this.state.isDocumentumConnectorChecked}
        useFilenetConnector={this.state.isFilenetConnectorChecked}
        userName={this.state.userName}
        viewerServerURL={this.state.viewerServerURL}
        freeVersion={this.state.freeVersion}
        contentSecurity={this.state.contentSecurity}
        selectedTheme={this.state.selectedTheme}
        enableShortcutWithoutClick={this.state.isEnableSHortcutKeysWithoutClick}
        registerCallbackFunctions={this.state.isRegisterCallbackFunctions}
        isHideRibbonToolBar={this.state.isHideRibbonToolBar}
        isSkipLocationChange={this.state.isSkipLocationChange}
        selectedLanguage = {this.state.selectedLanguage}
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

  handleColourMode = (event) => {
    this.setState({
      selectedTheme: event.target.value,
    });
  };

  handleDefaultLang = (event) => {
    this.setState({
      selectedLanguage : event.target.value,
    })
  }

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

  handleInputfreeVersion = (event) => {
    this.setState({
      freeVersion: event.target.value,
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
        !this.state.isEnableSHortcutKeysWithoutClick,
    });
  };
  toggleRegisterCallbackFunctions = () => {
    this.setState({
      isRegisterCallbackFunctions: !this.state.isRegisterCallbackFunctions,
    });
  };
  toggleOverrideThumbIndicatorOverride = () => {
    this.setState({
      isThumbnailIndicatorChecked: !this.state.isThumbnailIndicatorChecked,
    });
  };

  toggleHideRibbonToolBar = () => {
    this.setState({
      isHideRibbonToolBar: !this.state.isHideRibbonToolBar,
    });
  };

  toggleSkipLocationChange = () => {
    this.setState({
      isSkipLocationChange: !this.state.isSkipLocationChange,
    });
  };

  toggleDocumentumConnector = () => {
    this.setState((prevState) => ({
      isDocumentumConnectorChecked: !this.state.isDocumentumConnectorChecked,
      isFilenetConnectorChecked: false,
    }));
  };

  toggleFilenetConnector = () => {
    this.setState((prevState) => ({
      isFilenetConnectorChecked: !this.state.isFilenetConnectorChecked,
      isDocumentumConnectorChecked: false,
    }));
  };

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
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-sm"
            name="freeVersion"
            value={this.state.freeVersion}
            onChange={this.handleInputfreeVersion}
            placeholder="freeVersion"
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
          <input
            type="text"
            className="form-control form-control-sm"
            name="Content Security Policy"
            value={this.state.selectedTheme}
            onChange={this.handleColourMode}
            placeholder="Default | Dark | Light"
          />
        </div>
        <div>
          <input
            type="text"
            className="form-control form-control-sm"
            name="Content Security Policy"
            value={this.state.selectedLanguage}
            onChange={this.handleDefaultLang}
            placeholder="en , ja ,fr"
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
              checked={this.state.isDocumentumConnectorChecked}
              onChange={this.toggleDocumentumConnector}
            />
            Use Documentum Connector
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={this.state.isFilenetConnectorChecked}
              onChange={this.toggleFilenetConnector}
            />
            Use Filenet Connector
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
          <label>
            <input
              type="checkbox"
              defaultChecked={this.state.isRegisterCallbackFunctions}
              onChange={this.toggleRegisterCallbackFunctions}
            />
            Register Callback functions
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={this.state.isHideRibbonToolBar}
              onChange={this.toggleHideRibbonToolBar}
            />
            Hide Ribbon ToolBar
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              defaultChecked={this.state.isSkipLocationChange}
              onChange={this.toggleSkipLocationChange}
            />
            SkipLocationChange
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
