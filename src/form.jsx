import React, { Component, useState } from "react";
import App from "./App";
import ReactDOM from "react-dom";
import eViewerApp from "@mstechusa/eviewer7/js/eViewer7";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewerServerURL: this.props.viewerServerURL,
      freeVersion: this.props.freeVersion,
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
      officeServiceUrl: "",
      aiServiceUrl: "",
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
      saveAnnotationTypeModcap: null,
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

  handleInputofficeServiceUrl = (event) => {
    this.setState({
      officeServiceUrl: event.target.value
    });
  };

  handleInputaiServiceUrl = (event) => {
    this.setState({
      aiServiceUrl: event.target.value
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
      console.log("Default User Preferences");
      console.log(preferences);

      const userPreferences = preferences.userPreferences;
      const shortcutPreferences = preferences.shortcutPreferences;
      const annotationPreferences = preferences.annotationPreferences;
      console.log(userPreferences);
      console.log(shortcutPreferences);
      console.log(annotationPreferences);

      let newPref = JSON.parse(JSON.stringify(userPreferences)); // just a hack to clone
      let newAnnotationPref = JSON.parse(JSON.stringify(annotationPreferences));
      newPref.general.isLogEnabled = true;
      newPref.general.selectedOption = "debug";
      if (self?.props?.overrideEnableHyperLink) {
        if (
          self.state.regularExpression == null ||
          self.state.regularExpression === " "
        ) {
          self.state.regularExpression = " ";
        }

        if (
          self?.state?.regularExpression != null &&
          self?.state?.regularExpression !== "*"
        ) {
          newPref.general.enableHyperlinksByRegEx = new RegExp(
            self.state.regularExpression
          ).source;
        }
      }

      // add new icon in the comment status
      // newPref.commentStatus.push({
      //   iconUrl : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIABAMAAAAGVsnJAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAABVQTFRF////4hsb4hsb4hsb4hsb4hsb4hsbVcAJqQAAAAZ0Uk5TAARUp6v7ZOI89wAADIFJREFUeNrt3cmRFE0MBeBmLCACDOAiA7hwzwsGcMABoP034Z99eqklU8vTy9LPndAL9DHTXZUpnU6aP1++nej+PHzH1fr08xffP4D8/Qyr9fX8j47Aw+9zwwE4n+kIyPkMI/D1fKYj8AjgjCLwBICOgDxlAhF4AsBG4BkAiMALADIC8pIJQuAFABeBVwAQAm8AqAjIWyYAgTcATATeAQAIfAAgIiAfmcIJfADgIXABIJzAJQAaAnKZKZjAJQAWAlcAgglcAyAhINeZQglcA+AgcAMglMAtAAoCcpspkMAtAAYCdwACCdwDICAg95nCCNwDyCewACCMwBKAdAKylCmIwBKAbAKLAIIILANIJiDLmUIILAPIJbACIITAGoBUArKWKYDAGoBMAqsAAgisA0gkIOuZ3AmsA8gjsAHAncAWgDQCspXJmcAWgCwCmwCcCWwDSCIg25lcCWwDyCGwA8CVwB6AFAKyl8mRwB6ADAK7ABwJ7ANIICD7mdwI7APAE+gA4EagBwCcgPRkciLQAwBNoAuAE4E+AGAC0pfJhUAfACyBTgAuBHoBQAlIbyYHAr0AkAS6ATgQ6AcAJCD9mcwE+gHgCAwAMBMYAQAjICOZjARGAKAIDAEwEhgDACIgY5lMBMYAYAgMAjARGAUAISCjmQwERgEgCAwDMBAYBwAgIOOZ1ATGAcQTUABQE9AACCcgmkxKAhoA0QRUAJQEdACCCYguk4qADkAsASUAFQEtgFACos2kIKAFEElADUBBQA8gkIDoMw0T0AOII2AAMEzAAiCMgFgyDRKwAIgiYAIwSMAGIIiA2DINEbABiCFgBDBEwAoghIBYMw0QsAKIIGAGMEDADiCAgNgzdROwA/An4ACgm4AHAHcC4pGpk4AHAG8CLgA6CfgAcCYgPpm6CPgA8CXgBKCLgBcAVwLilamDgBcATwJuADoI+AFwJCB+mXYJ+AHwI+AIYJeAJwA3AuKZaYeAJwAvAq4Adgj4AnAiIL6ZNgn4AvAh4Axgk4A3ABcC4p1pg4A3AA8C7gA2CPgDcCAg/plWCfgDsBMIALBKIAKAmYBEZFohEAHASiAEwAqBGABGAhKTaZFADAAbgSAAiwSiAJgISFSmBQJRACwEwgAsEIgDYCAgcZnuCMQB0BMIBHBHIBKAmoBEZrohEAlASyAUwA2BWABKAhKb6YpALAAdgWAAVwSiAagISHSmCwLRADQEwgFcEIgHoCAg8ZneCcQDGCcAAPBOAAFgmIAgMr0SQAAYJQAB8EoAA2CQgGAyPRPAABgjAALwTAAFYIiAoDI9EkABGCEAA/BE4AesVj8BwWX6gyzWSwAI4LEp2GpsAJ56QkcA3RI6AvCOkBHAN4SMQEI/qAhktIOKQEo3iAjkNIOIQFIvaAhktYKGQFonSAjkNYKEQGIfKAhktoGCQGoXCAjkNoGAQHIP0glktyCdQHoHkgPk/x9MTkDwUzg1AsPv4dQMFJ/EEkNwfBZPTEHybSwtBsv38bQcNE9kkoLwPJNLSkL0VDYlCtNz+ZQsVG9mEsJwvZtLSEP2dhYeh+39PDwP3QkNcCC+MzrgRISntKCRCA9pYQkQAsASIASAJcAIAEqAEcAxCYzd2JDaAI5IYPTWltQGcDwC4zc3pTaAoxHQ3N6W2gCORUA3wUFqAzgSAe0UF6kN4DgE9JOcpDaAoxCwTHOT2gCOQcA20VFqAzgCAetUV6kNYH4C9snOUhvA7AQ8prtLbQBzE/DZ8CC1AcxMwGvLi9QGMC8Bv01PUhvArAQ8t71JbQBzEvDd+Ci1AcxIwHvrq9QGMB8B/83PUhvAbAQitr9LbQBzEYgAMBWBCAAzEYgBMBGBGADzEIgCMA2BKACzEIgDMAmBOABzEIgEMAWBSAAzEIgFMAGBWAD8BKIB0BOIBsBOIB4AOYF4ANwEEACoCSAAMBPAACAmgAHASwAFgJYACgArARwAUgI4AJwEkAAoCSABMBLAAiAkgAXARwANgI4AGgAbATwAMgJ4AFwEMgBQEcgAwEQgBwARgRwAPASyANAQyALAQiAPAAmBPAAcBDIBUBDIBMBAIBcAAYFcAPkEsgGkE8gGkE0gH0AygXwAuQQYAKQSYACQSYADQCIBDgB5BFgApBFgAZBFgAdAEgEeADkEmACkEGACkEGAC0ACAS4AeAJsAOAE2ACgCfABABPgA4AlwAjg/3+A6v8Fyv8QrP5rsPwHoeofhct/Gar+dbj8A5Hqj8TKPxSt/li8/IuR6q/Gyr8crf56vPwBiepHZMofkqp+TK78QcnqR2XLH5aufly+/IWJ6ldmyl+aqn5trvzFyepXZ8tfnq5+fb78AIXqIzTKD1GpPkan/CCl6qO0yg9Tqz5Or/xAxeojNcsPVa0+Vrf8YOXqo7XLD1evPl6//IKF6is2yi9Zqb5mp/yipeqrtsovW6u+bq/8wsXqKzfLL12tvna3/OLl6qu3yy9fnwZAEIF5AAQRmAhACIGZAIQQmApAAIG5AAQQmAyAO4HZALgTmA6AM4H5ADgTmBCAK4EZAbgSmBKAI4E5ATgSmBSAG4FZAbgRmBaAE4F5ATgRmBiAC4GZAbgQmBqAA4G5ATgQmByAmcDsAMwEpgdgJDA/ACOBAwAwETgCABOBQwAwEDgGAAOBgwBQEzgKADWBwwBQEjgOACWBAwFQETgSABWBQwFQEDgWAAWBgwEYJnA0AMMEDgdgkMDxAAwSOCCAIQJHBDBEAAjg329CAkgAv4SQADTTAx8BcCQ+AuBEdATggdgIwPOQEUiIw0UgIQ0VgZQwTARSshARSIrCQyApCQ2BtCAsBNJykBBIjMFBIDEFBYHUEAwEUjMQEEiOkE8gOUE6gfQA2QTSCSZ3gOCHUG4LCH4NpfaA4oNIZhMoPoomdoHky0heG0i+jqb1geaBRFYjaB5JJXWC6KFkTiuIHkun9ILqxURGM6heTSV0g+zlJL4dZK+n4f2gO6CAbgjdERVwRwgPKWFbQnhMDduTH3QAoAT+nL7SAYASaKdPP+kAAAn8/XyCERg5rg4j0B6LoQgMXVgQHAAUgbErKyAC7bkYhsDgpSXBAcAQGL22BiHQXoshCAxfXBQcAASB8aurAALtvVg8AcXlZcEBiCegub4eTqBdFIsmoBpgIDgA0QR0IyyCCbSrYrEElENMBAcgloB2jE0ogXZTLJKAepCR4ABEEtCPsgok0O6KxREwDDMTHIA4ApZxdmEE2kKxKAKmgYaCAxBFwDbSMohAWywWQ8A41FRwAGIIWMfahhBoK8UiCJgHGwsOQAQB+2jrAAJttZg/AYfh5oID4E/AY7y9O4G2UcybgMuCA8EB8Cbgs+LCmUDbLOZLwGnJieAA+BLwWnPjSqDtFPMk4LboSHAAPAn4rbpyJNB2i/kRcFx2JjgAfgQ81925EWgdxbwIuC48FBwALwK+Ky+dCLSuYj4EnJeeCg6ADwHvtbcuBFpnMQ8C7ouPBQfAg4D/6msHAq27mJ1AwPJzwQGwEwjYfW4n0AaKWQkEADATGAFgJRABwEygDRWzEQgBYCQwBsBGIAaAkUAbLGYhEATARGAUgIVAFAATgTZcTE8gDICBwDgAPYE4AAYCTVFMSyAQgJqABoCWQCQANYGmKqYjEApASUAHQEcgFoCSQFMW0xAIBqAioAWgIRANQEWgqYuNEwgHoCCgBzBOIB6AgkAzFBslAAAwTMACYJQAAsAwgWYqNkYAAmCQgA3AGAEMgEECzVhshAAIwBABK4ARAigAQwSauVg/ARiAAQJ2AP0EcAAGCDSHYr0EgAC6CXgA6CWABNBNoLkU6yMABdBJwAdAHwEsgE4CzalYDwEwgC4CXgB6CKABdBFobsX2CcABdBDwA7BPAA+gg0BzLLZHIAHALgFPAHsEMgDsEmiuxbYJpADYIeALYJtADoAdAs252BaBJACbBLwBbBHIArBJoLkXWyeQBmCDgD+AdQJ5ADYItIBiawQSAawSiACwRiATwCqBFlJsmUAqgBUCMQCWCeQCWCHQgootEUgGsEggCsASgWwAiwRaWLF7AukAFgjEAbgnkA9ggUALLHZLgADAHYFIALcEGADcEWihxa4JUAC4IRAL4JoAB4AbAi242CUBEgBXBKIBXBJgAXBFoIUX+yBAA+CCQDyADwI8AC4INECxNwJEAN4JIAC8EWAC8E6gQYq9EKAC8EoAA+CFABeAVwINVOyJABmAZwIoAE8E2AA8E2iwYp9+0gF4JIADcDp9+cb3D/DwXfXX/gPr935mBQW8yAAAAABJRU5ErkJggg==",
      //   text : "Delete"
      // });

      // delete icon from comment status
      // newPref.commentStatus.pop(6);
      console.log("Setting User Preferences with logs enabled");
      console.info(newPref);
      if (
        this.state.defaultPrefJSON == null &&
        this.state.userPrefEndPoint == null
      ) {
        newPref.general.selectedLanguage = this.props.selectedLanguage;
      }

      let newShortcutPref = JSON.parse(JSON.stringify(shortcutPreferences));

      // newShortcutPref.shortcuts[0].key = "Ctrl+D+P";

      console.log("Setting Shortcut Preferences with Ctrl+D+P for zoomin");
      console.info(newShortcutPref);

      newPref.general.isOcrEnabled = true;
      viewerPrefSrvc
        .setUserPreferences(newPref, newShortcutPref, newAnnotationPref)
        .then((response) => {
          viewerPrefSrvc.getUserPreferences().then((x) => {
            this.setState({
              saveAnnotationTypeModcap:
                x.userPreferences.general.saveAnnotationAsMimeType ===
                "application/vnd.ibm.modcap"
            });
            console.log("Getting User Preferences to verify logs are enabled");
            console.log(x);
          });
        });
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
    if (this.props.useFilenetConnector) {
      this.eViewerObj
        .getDocumentService()
        .setFileNetCredentials("", "", "p8")
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
        this.state.hideToolBar,
        this.state.officeServiceUrl,
        this.state.aiServiceUrl
      );
    } else {
      this.eViewerObj.setDocumentEndPointOptions(
        options,
        this.state.viewerServerURL,
        this.state.savingEndpoint, // for SSA
        // null, // set as null for Deloitte FL
        this.state.ocrEndpoint,
        this.state.hideToolBar,
        this.state.officeServiceUrl,
        this.state.aiServiceUrl
      );
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
          <div
            className="card-body"
            style={{
              backgroundColor:
                this.props.selectedTheme === "Dark"
                  ? "rgb(43, 46, 54)"
                  : this.props.selectedTheme === "Light"
                    ? "rgb(240, 244, 249)"
                    : undefined
            }}
          >
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
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="officeServiceUrl"
                  value={this.state.officeServiceUrl}
                  onChange={this.handleInputofficeServiceUrl}
                  placeholder="OfficeService URL (e.g. http://192.168.1.65:8081)"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="aiServiceUrl"
                  value={this.state.aiServiceUrl}
                  onChange={this.handleInputaiServiceUrl}
                  placeholder="aiServiceUrl (e.g. http://192.168.10.33:9999)"
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
                  <div
                    style={{
                      color:
                        this.props.selectedTheme === "Dark" ? "#fff" : "#3f2626"
                    }}
                  >
                    User Preference JSON
                  </div>
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
                  <div
                    style={{
                      color:
                        this.props.selectedTheme === "Dark" ? "#fff" : "#3f2626"
                    }}
                  >
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
                  <div
                    style={{
                      color:
                        this.props.selectedTheme === "Dark" ? "#fff" : "#3f2626"
                    }}
                  >
                    Annotation Preference JSON
                  </div>
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
                  <div
                    style={{
                      color:
                        this.props.selectedTheme === "Dark" ? "#fff" : "#3f2626"
                    }}
                  >
                    {" "}
                    User Preference URL
                  </div>
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
                  <div
                    style={{
                      color:
                        this.props.selectedTheme === "Dark" ? "#fff" : "#3f2626"
                    }}
                  >
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
                  <div
                    style={{
                      color:
                        this.props.selectedTheme === "Dark" ? "#fff" : "#3f2626"
                    }}
                  >
                    Regular Expression
                  </div>
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
                    className="form-control-sm"
                    name="savePayloadType"
                    onChange={this.handleSavePayloadType}
                    style={{ height: "30px", width: "30px" }}
                  />
                  <div
                    style={{
                      color:
                        this.props.selectedTheme === "Dark"
                          ? "#fff"
                          : "#3f2626",
                      marginLeft: "5%"
                    }}
                  >
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
                    className="form-control-sm"
                    name="saveEndpointReject"
                    onChange={this.handlesaveEndpointReject}
                    style={{ height: "30px", width: "30px" }}
                  />
                  <div
                    style={{
                      color:
                        this.props.selectedTheme === "Dark"
                          ? "#fff"
                          : "#3f2626",
                      marginLeft: "5%"
                    }}
                  >
                    {" "}
                    &nbsp;saveDocumentEndpointReject
                  </div>
                </div>
              }
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor:
                    this.props.selectedTheme === "Dark"
                      ? "rgb(43, 46, 54)"
                      : this.props.selectedTheme === "Light"
                        ? "rgb(240, 244, 249)"
                        : undefined,
                  color:
                    this.props.selectedTheme === "Light" ? "black" : undefined
                }}
                onClick={this.handleSubmit}
              >
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
            freeVersion={this.props.freeVersion}
            userName={this.props.userName}
            licenseKey={this.props.licenseKey}
            overrideCtxMenu={this.props.overrideCtxMenu}
            overrideThumbIndicator={this.props.overrideThumbIndicator}
            overrideHyperLink={this.props.overrideEnableHyperLink}
            contentSecurity={this.props.contentSecurity}
            selectedTheme={this.props.selectedTheme}
            documentumConnector={this.props.useDocumentumConnector}
            enableShortcutWithoutClick={this.props.enableShortcutWithoutClick}
            registerCallbackFunctions={this.props.registerCallbackFunctions}
            isHideRibbonToolBar={this.props.isHideRibbonToolBar}
            isSkipLocationChange={this.props.isSkipLocationChange}
            isRibbonHidden={this.state.isRibbonHidden}
            saveAnnotationTypeModcap={this.state.saveAnnotationTypeModcap}
            selectedLanguage = {this.props.selectedLanguage}
          />
        </div>
      </>
    );
  }
}

export default Form;
