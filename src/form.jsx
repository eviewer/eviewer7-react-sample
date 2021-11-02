import React, { Component, useState } from "react";
import App from "./App";
import ReactDOM from "react-dom";
import eViewerApp from "@mstechusa/eviewer7/js/eViewer7 v1.0.11";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewerServerURL: "",
      serverUrl: "",
      savingEndpoint: "",
      userName: "",
      token: "",
      isViewerLoaded: false,
      hideToolBar: false,
      saveMultipartPayLoadType: false,
      fitStyle: "default",
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
  handleSubmit = (event) => {
    this.eViewerObj = new eViewerApp();
    let userName = this.state.userName;
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

    this.eViewerObj.setDocumentEndPointOptions(
      options,
      this.state.viewerServerURL,
      this.state.savingEndpoint,
      userName
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
              {}
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
