import React, { Component, useState } from "react";
import App from "./App";
import ReactDOM from "react-dom";
import eViewerApp from "@mstechusa/eviewer7/js/eViewer7";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewerServerURL: "",
      serverUrl: "",
      savingEndpoint: "",
      ocrEndpoint: "",
      userName: "",
      token: "",
      isViewerLoaded: false,
      hideToolBar: false,
      saveMultipartPayLoadType: false,
      fitStyle: "default",
      appearanceList: [
        "BASE64 IMAGE GOES HERE",
      ],
      savedCertificates: [
        {
          issuedBy: "",
          expiry: "",
          certificate:
            "BASE64 CERTIFICATE STREAM GOES HERE",
          password: "BASE64 ENCODED PASSWORD GOES HERE",
        },
      ],
    };
  }

  handleInputviewerServerURL = (event) => {
    this.setState({
      viewerServerURL: event.target.value,
    });
  };

  handleInputsavingEndpoint = (event) => {
    this.setState({
      savingEndpoint: event.target.value,
    });
  };
  handleInputocrEndpoint = (event) => {
    this.setState({
      ocrEndpoint: event.target.value,
    });
  };
  handleInputuserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  handleToken = (event) => {
    this.setState({
      token: event.target.value,
    });
  };
  handleShowHideToolBar = (event) => {
    this.setState({
      hideToolBar: event.target.checked,
    });
  };
  handleSavePayloadType = (event) => {
    this.setState({
      saveMultipartPayLoadType: event.target.checked,
    });
  };

  setViewerOptions = () => {
    let eViewerObj = new eViewerApp("Administrator");

    let viewerPrefSrvc = eViewerObj.getViewerPreferenceService();
    let preferencesPromise = viewerPrefSrvc.getUserPreferences(
      this.state.defaultPrefJSON,
      this.state.defaultShortcutPrefJSON
    );
    preferencesPromise.then((preferences) => {
      viewerPrefSrvc.setUserPreferences(JSON.stringify(preferences.userPreferences), JSON.stringify(preferences.shortcutPreferences));
    });
  };

  prefJSONPath = (events) => {
    let reader = new FileReader();
    reader.readAsDataURL(events.target.files[0]);
    reader.onload = (events) => {
      let defPrefJSON = events.target.result;
      if (events.target.result !== undefined) {
        defPrefJSON = atob(
          events.target.result.split("data:application/json;base64,")[1]
        );
      }
      this.setState({
        defaultPrefJSON: JSON.parse(defPrefJSON),
      });
    };
  };

  shortcutPrefJSONPath = (events) => {
    let reader = new FileReader();
    reader.readAsDataURL(events.target.files[0]);
    reader.onload = (events) => {
      let defPrefJSON = events.target.result;
      if (events.target.result !== undefined) {
        defPrefJSON = atob(
          events.target.result.split("data:application/json;base64,")[1]
        );
      }
      this.setState({
        defaultShortcutPrefJSON: JSON.parse(defPrefJSON),
      });
    };
  };

  handleSubmit = (event) => {
    this.setViewerOptions();
    this.eViewerObj = new eViewerApp(this.state.userName);
    let savePayloadType = "application/json";

    if (this.state.saveMultipartPayLoadType === true) {
      savePayloadType = "multipart/form-data";
    }
    let options = {
      type: "GET",
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/octet-stream.",
      },
      savePayLoadType: savePayloadType,
    };

    let sigSrvc = this.eViewerObj.getSignatureService();
    sigSrvc.setAvailableAppearances(this.state.appearanceList);
    sigSrvc.setAvailableCertificates(this.state.savedCertificates);
    this.eViewerObj.setDocumentEndPointOptions(
      options,
      this.state.viewerServerURL,
      this.state.savingEndpoint,
      this.state.ocrEndpoint
    );

    this.setState({
      isViewerLoaded: true,
    });
  };
  render() {
    return (
      <>
        <div
          id="form"
          style={{ display: this.state.isViewerLoaded ? "none" : "block" }}
          className="login-box card bg-info div-mst"
        >
          <div className="card-body">
            <div className="form-horizontal">
              {}
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
              {}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="savingEndpoint"
                  value={this.state.savingEndpoint}
                  onChange={this.handleInputsavingEndpoint}
                  placeholder="Saving End point"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="ocrEndpoint"
                  value={this.state.ocrEndpoint}
                  onChange={this.handleInputocrEndpoint}
                  placeholder="OCR End point"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.handleInputuserName}
                  placeholder="User Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="token"
                  value={this.state.token}
                  onChange={this.handleToken}
                  placeholder="Authorization Token"
                />
              </div>
              {
                <div className="form-group">
                  <div>User Preference JSON</div>
                  <input
                    type="file"
                    className="form-control form-control-sm wrapword"
                    id="prefJSON"
                    name="prefJSONPath"
                    onChange={this.prefJSONPath}
                    required
                  />
                </div>
              }
              {
                <div className="form-group">
                  <div>Shortcut Preference JSON</div>
                  <input
                    type="file"
                    className="form-control form-control-sm wrapword"
                    id="shortcutPrefJSON"
                    name="shortcutPrefJSONPath"
                    onChange={this.shortcutPrefJSONPath}
                    required
                  />
                </div>
              }
              {
                <div className="form-group" style={{ display: "flex" }}>
                  <input
                    type="checkbox"
                    className="form-control form-control-sm"
                    name="savePayloadType"
                    onChange={this.handleSavePayloadType}
                  />
                  <div>&nbsp;SavePayloadType - multipart/form-data</div>
                </div>
              }
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>

        {}
        <div
          id="mainviewer"
          style={{
            display: this.state.isViewerLoaded ? "block" : "none",
          }}
        >
          <App userName={this.state.userName} />
        </div>
      </>
    );
  }
}

export default Form;
