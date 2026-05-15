import React, { Component, useState } from "react";
import App from "./App";
import ReactDOM from "react-dom";
import eViewerApp from "@mstechusa/eviewer7/js/eViewer7";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewerServerURL: this.props.viewerServerURL,
      serverUrl: "",
      savingEndpointReject: (response) => {
        return new Promise((resolve, reject) => {
          reject();
        });
      },
      setTabMenuHandler: (docID) => {
        const self = this;
        console.log("Document Id : " + docID);
        return [
          {
            id: "closeDoc",
            caption: "Close Document",
            type: "menuitem",
            onClick: function () {
              self.tabMenuCloseDoc();
            },
            disabled: true
          },
          { type: "separator" },
          {
            id: "closeAllDoc",
            type: "menuitem",
            caption: "Close All Documents",
            onClick: function () {
              self.tabMenuCloseAllDoc();
            },
            disabled: false
          }
        ];
      },
      savingEndpoint: (response) => {
        return new Promise((resolve, reject) => {
          console.info(response);
          const { clientDocID, docContent, annContent, annMimeType, mimeType } =
            response;

          if (annMimeType === "application/octet-stream") {
            // Download TL
            const downloadType = "application/octet-stream";
            let link = window.document.createElement("a");
            if (response.annContent != null) {
              const tlfile = new Blob([annContent], {
                type: downloadType
              });

              const data = window.URL.createObjectURL(tlfile);
              window.document.body.appendChild(link);
              link.href = data;
              link.download = "sample.modcap";
              link.click();
            }
            //

            // const blob = new Blob([docContent], { type: mimeType });
            // const blobUrl = URL.createObjectURL(blob);

            // // Create a link element
            // const link = window.document.createElement("a");

            // // Set link's href to point to the Blob URL
            // link.href = blobUrl;
            // link.download = "test.tiff";

            // // Append link to the body
            // window.document.body.appendChild(link);

            // // Download blob programmatically as a file
            // link.click();
          }
          resolve("SUCCESS");
        });
      },
      ocrEndpoint: "",
      userName: this.props.userName,
      token: "",
      isViewerLoaded: false,
      hideToolBar: false,
      saveMultipartPayLoadType: false,
      savingEndpointRejectValue: false,
      fitStyle: "default",
      isRibbonHidden: false,
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

  // handleInputviewerServerURL = (event) => {
  //   this.setState({
  //     viewerServerURL: event.target.value,
  //   });
  // };

  handleInputsavingEndpoint = (event) => {
    if (event.target.value.length > 0) {
      this.setState({
        savingEndpoint: event.target.value
      });
    }
  };
  handleInputocrEndpoint = (event) => {
    this.setState({
      ocrEndpoint: event.target.value
    });
  };

  handleUserPrefUrl = (event) => {
    this.setState({
      userPrefEndPoint: event.target.value
    });
  };

  handleShortcutPrefPrefUrl = (event) => {
    this.setState({
      shortcutPrefEndPoint: event.target.value
    });
  };

  handleRegularExpression = (event) => {
    this.setState({
      regularExpression: event.target.value
    });
  };
  // handleInputuserName = (event) => {
  //   this.setState({
  //     userName: event.target.value,
  //   });
  // };

  handleToken = (event) => {
    this.setState({
      token: event.target.value
    });
  };
  handleShowHideToolBar = (event) => {
    this.setState({
      hideToolBar: event.target.checked
    });
  };
  handleSavePayloadType = (event) => {
    this.setState({
      saveMultipartPayLoadType: event.target.checked
    });
  };
  handlesaveEndpointReject = (event) => {
    this.setState({
      savingEndpointRejectValue: event.target.checked
    });
  };

  tabMenuCloseDoc = () => {
    return new Promise((resolve, reject) => {
      let status = false;

      if (this.eViewerObj === null) {
        this.eViewerObj = new eViewerApp(this.props.userName);
      }
      this.eViewerObj.documentService.closeDocument("");
      status = true;

      if (status) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  };

  tabMenuCloseAllDoc = () => {
    return new Promise((resolve, reject) => {
      let status = false;
      if (this.eViewerObj === null) {
        this.eViewerObj = new eViewerApp(this.props.userName);
      }
      this.eViewerObj.documentService.closeAllDocuments("");
      status = true;
      if (status) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  };

  isRibbonHiddenFromPref() {
    let allTabsHidden = true;
    for (let toolbar of this.state.defaultPrefJSON.ribbonToolbar) {
      if (!allTabsHidden) {
        break;
      }
      // let toolbar = this.userPreference.ribbonToolbar[toolbarKey]; // Get the actual object
      switch (toolbar.name) {
        case "View":
          if (toolbar.isViewTabVisible) {
            allTabsHidden = false;
          }
          break;
        case "Insert":
          if (toolbar.isInsertTabVisible) {
            allTabsHidden = false;
          }
        case "Annotate":
          if (toolbar.isAnnotationTabVisible) {
            allTabsHidden = false;
          }
        case "Redact":
        case "Annotate":
          if (toolbar.isRedactTabVisible) {
            allTabsHidden = false;
          }
        case "Signature":
          if (toolbar.isSignatureTabVisible) {
            allTabsHidden = false;
          }
        case "Speech":
          if (toolbar.isSpeechTabVisible) {
            allTabsHidden = false;
          }
        case "Compare":
          if (toolbar.isCompareTabVisible) {
            allTabsHidden = false;
          }
        case "Medify":
          if (toolbar.isMedifyTabVisible) {
            allTabsHidden = false;
          }
          break;
      }
    }
    return allTabsHidden;
  }

  setViewerOptions = () => {
    let eViewerObj = new eViewerApp(this.props.userName);
    const self = this;
    if (this.state.shortcutPrefEndPoint != null) {
      this.state.defaultShortcutPrefJSON = this.state.shortcutPrefEndPoint;
    }

    if (this.state.userPrefEndPoint != null) {
      this.state.defaultPrefJSON = this.state.userPrefEndPoint;
    }

    if (
      this.state.defaultPrefJSON != null &&
      this.state.defaultPrefJSON.ribbonToolbar != null
    ) {
      this.state.isRibbonHidden = this.isRibbonHiddenFromPref();
    }

    let viewerPrefSrvc = eViewerObj.getViewerPreferenceService();
    let preferencesPromise = viewerPrefSrvc.getUserPreferences(
      this.state.defaultPrefJSON,
      this.state.defaultShortcutPrefJSON,
      this.state.defaultAnnotationPrefJSON
    );
    preferencesPromise.then((preferences) => {
      viewerPrefSrvc.setUserPreferences(JSON.stringify(preferences.userPreferences), JSON.stringify(preferences.shortcutPreferences), preferences.userPreferences.annotationPreference);
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
        defaultPrefJSON: JSON.parse(defPrefJSON)
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
        defaultShortcutPrefJSON: JSON.parse(defPrefJSON)
      });
    };
  };

  annotationPrefJSONPath = (events) => {
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
        defaultAnnotationPrefJSON: JSON.parse(defPrefJSON)
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
      type: "POST",
      headers: {
        Authorization: "Bearer " + this.state.token,
        Accept: "application/octet-stream."
      },
      savePayLoadType: savePayloadType
    };

    let sigSrvc = this.eViewerObj.getSignatureService();
    sigSrvc.setAvailableAppearances(this.state.appearanceList);
    sigSrvc.setAvailableCertificates(this.state.savedCertificates);

    if (this.props.useDocumentumConnector) {
      this.eViewerObj
        .getDocumentService()
        .setDocumentumCredentials("postgres", "password", "documentum")
        .then((res) => {
          console.log(res);
        });
    }
    if (this.props.useICNConnector) {
      this.eViewerObj
        .getDocumentService()
        .setICNFileNetCredentials("administrator", "MstSrv@05", "p8")
        .then((res) => {
          console.log(res);
        });
    }

    this.eViewerObj.setTabMenuHandler(this.state.setTabMenuHandler);

    if (this.state.savingEndpointRejectValue === true) {
      this.eViewerObj.setDocumentEndPointOptions(
        options,
        this.state.viewerServerURL,
        this.state.savingEndpointReject, // for SSA
        // null, // set as null for Deloitte FL
        this.state.ocrEndpoint,
        this.state.hideToolBar
      );
    } else {
      this.eViewerObj.setDocumentEndPointOptions(
        options,
        this.state.viewerServerURL,
        this.state.savingEndpoint, // for SSA
        // null, // set as null for Deloitte FL
        this.state.ocrEndpoint,
        this.state.hideToolBar,
        
      );
    }

    if (this.props.useDocumentumConnector) {
      this.eViewerObj
        .getDocumentService()
        .setDocumentumCredentials(this.state.userName, this.state.password, "documentum")
        .then((res) => {
          console.log(res);
        });
    }

    this.setState({
      isViewerLoaded: true
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
              {}
              {}
              {
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
              }
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
              {}
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
                  <div style={{ color: "#3f2626" }}>User Preference JSON</div>
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
                  <div style={{ color: "#3f2626" }}>
                    Shortcut Preference JSON
                  </div>
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
                <div className="form-group">
                  <div style={{ color: "#3f2626" }}>Annotation Preference JSON</div>
                  <input
                    type="file"
                    className="form-control form-control-sm wrapword"
                    id="AnnotationPrefJSON"
                    name="annotationPrefJSONPath"
                    onChange={this.annotationPrefJSONPath}
                    required
                  />
                </div>
              }
              {
                <div className="form-group">
                  <div style={{ color: "#3f2626" }}> User Preference URL</div>
                  <input
                    type="text"
                    className="form-control form-control-sm wrapword"
                    id="userPrefUrl"
                    name="userPrefUrlPath"
                    placeholder="User Preference URL"
                    onChange={this.handleUserPrefUrl}
                    required
                  />
                </div>
              }
              {
                <div className="form-group">
                  <div style={{ color: "#3f2626" }}>
                    Shortcut Preference URL
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-sm wrapword"
                    id="shortcutPrefUrl"
                    name="shortcutPrefUrlPath"
                    placeholder="Shortcut Preference URL"
                    onChange={this.handleShortcutPrefPrefUrl}
                    required
                  />
                </div>
              }
              {
                <div className="form-group">
                  <div style={{ color: "#3f2626" }}>Regular Expression</div>
                  <input
                    type="text"
                    className="form-control form-control-sm wrapword"
                    id="regExp"
                    name="regExpPath"
                    placeholder="Regular Expression"
                    onChange={this.handleRegularExpression}
                    required
                  />
                </div>
              }
              {
                <div
                  className="form-group"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    className="form-control form-control-sm"
                    name="savePayloadType"
                    onChange={this.handleSavePayloadType}
                    style={{ height: "30px", width: "30px" }}
                  />
                  <div style={{ color: "#3f2626", marginLeft: "5%" }}>
                    &nbsp;SavePayloadType - multipart/form-data
                  </div>
                </div>
              }
              {
                <div
                  className="form-group"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    className="form-control form-control-sm"
                    name="saveEndpointReject"
                    onChange={this.handlesaveEndpointReject}
                    style={{ height: "30px", width: "30px" }}
                  />
                  <div style={{ color: "#3f2626", marginLeft: "5%" }}>
                    {" "}
                    &nbsp;saveDocumentEndpointReject
                  </div>
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
            display: this.state.isViewerLoaded ? "block" : "none"
          }}
        >
          <App
            viewerServerURL={this.props.viewerServerURL}
            userName={this.props.userName}
            password={this.props.password}
            licenseKey={this.props.licenseKey}
            overrideCtxMenu={this.props.overrideCtxMenu}
            overrideThumbIndicator={this.props.overrideThumbIndicator}
            overrideHyperLink={this.props.overrideEnableHyperLink}
            contentSecurity={this.props.contentSecurity}
            documentumConnector={this.props.useDocumentumConnector}
            enableShortcutWithoutClick={this.props.enableShortcutWithoutClick}
            registerCallbackFunctions={this.props.registerCallbackFunctions}
            isHideRibbonToolBar={this.props.isHideRibbonToolBar}
            isRibbonHidden={this.state.isRibbonHidden}
          />
        </div>
      </>
    );
  }
}

export default Form;
