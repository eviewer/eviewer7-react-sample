import React, { Component } from "react";
import "./App.css";
import Form from "./form";
import eViewerApp from "@mstechusa/eviewer7/js/eViewer7";
import "./js/events";
import uuid from "react-uuid";

class App extends Component {
  constructor(props) {
    super(props);
    this.eViewerObj = null;
    this.state = {
      value: "uploadDocument",
      defaultDisabled: false,
      isUploadDivShow: false,
      isgotoPageDivShow: false,
      isinsertDivShow: false,
      isappendDivShow: false,
      issearchTextDivShow: false,
      isExportDivShow: false,
    };
    this.state = {
      docURLs: "",
      annURLs: "",
      // userName: "",
    };
    this.state = {
      doctype: "",
      pageOption: "",
      DocName: "",
    };
    this.state = {
      pageNO: 0,
    };
    this.state = {
      fileURL: null,
      file: null,
    };
    this.state = {
      textSearch: "",
    };
    this.selectedAnnotation = {
      name: "",
      startX: 0,
      endX: 0,
      startY: 0,
      endY: 0,
      option: "",
      annID: "",
      replyText: "",
      stampDetailsArray: [],
      comment: false,
      reply: false,
      addReply: false,
    };
  }
  componentDidMount() {
    this.loadViewer();
  }

  async loadViewer() {
    this.eViewerObj = new eViewerApp();

    this.eViewerObj.loadViewer("eviewer", null, null, "bestFit").then(() => {
      console.log("loading viewer successfully");
      this.setViewerOptions();
    });
    await import("@mstechusa/eviewer7/styles.css");
    await import("@mstechusa/eviewer7/scripts");
    await import("@mstechusa/eviewer7/runtime");
    await import("@mstechusa/eviewer7/polyfills");
    await import("@mstechusa/eviewer7/main");
    await import("@mstechusa/eviewer7/js/events");

    setTimeout(() => {
      let buttons = [
        {
          id: "leftdummybt",
          name: "Left Dummy",
          alignment: "leftToolbar",
          iconUrl: "assets/images/mst/custBtn.png",
          parent: "",
        },
        {
          id: "rightDummydt",
          name: "Right Dummy",
          alignment: "rightToolbar",
          iconUrl: "assets/images/mst/custBtn.png",
          parent: "",
        },
        {
          id: "ribbonDummyViewbt",
          name: "View Dummy",
          alignment: "ribbonToolbar",
          iconUrl: "assets/images/mst/custBtn.png",
          parent: "View",
        },
        {
          id: "ribbonDummyInsertbt",
          name: "Insert Dummy",
          alignment: "ribbonToolbar",
          iconUrl: "assets/images/mst/custBtn.png",
          parent: "Insert",
        },
        {
          id: "ribbonDummyAnnotatebt",
          name: "Annotate Dummy",
          alignment: "ribbonToolbar",
          iconUrl: "assets/images/mst/custBtn.png",
          parent: "Annotate",
        },
        {
          id: "ribbonDummyRedactbt",
          name: "Redact Dummy",
          alignment: "ribbonToolbar",
          iconUrl: "assets/images/mst/custBtn.png",
          parent: "Redact",
        },
      ];

      this.eViewerObj.addButtons(buttons);
    }, 100);
  }
  submitUploadDetail = (event) => {
    if (this.eViewerObj === null) {
      this.eViewerObj = new eViewerApp();
    }

    let annUrl = this.state.annURLs;
    if (annUrl == undefined) {
      annUrl = null;
    }
    let documentSrvc = this.eViewerObj.getDocumentService();

    let clientDocID = "client_" + uuid();
    documentSrvc
      .loadDocument(
        this.state.docURLs,
        annUrl,
        clientDocID,
        this.props.userName,
        true,
        "filesystem",
        "",
        ""
      )
      .then((response) => {
        console.log(response);
        this.setState({ defaultDisabled: false });
        this.setState({ docURLs: "" });
        this.setState({ annURLs: "" });
        // this.setState({ userName: "" });
      });

    if (this.selectedAnnotation.stampDetailsArray.length === 0) {
      this.getStamps();
    }
    this.disableAllDiv();
  };

  submitGotoPageDetail = () => {
    this.eViewerObj.documentService
      .gotoPage(this.state.pageNO)
      .then((response) => {
        console.log("gotoPage: " + response);
      });
    this.disableAllDiv();
  };

  submitTextDetail = () => {
    this.eViewerObj.documentService
      .searchText(this.state.textSearch)
      .then((response) => {
        console.log("searchText: " + response);
      });
    this.setState({ textSearch: "" });
    this.disableAllDiv();
  };

  submitInsertDetail = () => {
    if (this.eViewerObj === null) {
      this.eViewerObj = new eViewerApp();
    }
    let documentSrvc = this.eViewerObj.getDocumentService();
    documentSrvc.insertDocument(this.state.file).then((response) => {
      this.setState({ defaultDisabled: true });
      console.log("insertDocument: " + response);
    });

    this.disableAllDiv();

    if (this.selectedAnnotation.stampDetailsArray.length === 0) {
      this.getStamps();
    }
  };

  actualFilePath = (events) => {
    this.setState({
      file: events.target.files,
    });
  };

  submitExportDetail = () => {
    if (this.eViewerObj === null) {
      this.eViewerObj = new eViewerApp();
    }
    // let documentSrvc = this.eViewerObj.getDocumentService();
    let exportData = {
      docName: this.state.DocName,
      pageOption: this.state.pageOption,
      formName: "export",
      selectedOption: this.state.doctype,
      withAnn: "false",
      startPageExport: 0,
      endPageExport: 0,
    };
    this.eViewerObj.editingService.exportDocument(exportData);
    this.disableAllDiv();
  };

  setViewerOptions = () => {
    if (this.eViewerObj === null) {
      this.eViewerObj = new eViewerApp();
    }
    // let userName = "demouser";
    // let viewerJSON =
    //   '{"userId":"ibRGHYys","username":"Administrator","userType":0,"displayType":"Admin","createDate":1582628896703,"imageControl":true,"annotationControl":true,"viewControl":true,"staticControl":true,"insertControl":true,"isAnnotationTabVisible":true,"isInsertTabVisible":true,"isViewTabVisible":true,"saveDocument":true,"saveAsDocument":true,"exportDocument":true,"emailDocument":true,"print":true,"newDocument":true,"appendDocument":true,"reportBug":true,"metaData":true,"pageNavigation":true,"textToSpeech":true,"filter":true,"handScroll":true,"hideThumbnails":true,"panning":false,"imageOperation":true,"cutCopyPaste":true,"undo":true,"watermark":true,"deletePage":true,"split":true,"redaction":true,"zoom":true,"fitToWindow":true,"fitToHeight":true,"fitToWidth":true,"actual":true,"thumbnailView":true,"horizontalView":true,"verticalView":true,"rotate":true,"line":true,"arrow":true,"rectangle":true,"circle":true,"highlight":true,"pen":true,"textAnnotation":true,"stamp":true,"polyLine":true,"polygon":true,"stickynote":true,"checkpoint":true,"view":"pageView","zoomPreference":"actualControl","textSearch":true,"textSelect":true,"switchthumbnail":true,"showHideAnn":true,"closeAllFile":true,"closeFile":true,"newDocPre":"pdf","docPreChecked":true,"switchLeft":false,"switchThumb":"left"}';
    let viewerPrefSrvc = this.eViewerObj.getViewerPreferenceService();
    let preferencesPromise = viewerPrefSrvc.getUserPreferences(
      this.props.userName
    );
    preferencesPromise.then((preferences) => {
      // preferences.panning = false;
      viewerPrefSrvc.setUserPreferences(JSON.stringify(preferences), "a");
    });
  };

  disableAllDiv = () => {
    this.setState({
      isUploadDivShow: false,
      isgotoPageDivShow: false,
      isinsertDivShow: false,
      isappendDivShow: false,
      issearchTextDivShow: false,
      isExportDivShow: false,
    });
  };

  docURLsValue = (events) => {
    this.setState({ docURLs: events.target.value });
  };

  // userNameValue = (events) => {
  //   this.setState({ userName: events.target.value });
  // };

  annURLsValue = (events) => {
    this.setState({ annURLs: events.target.value });
  };

  pageNoValue = (events) => {
    this.setState({ pageNO: events.target.value });
  };

  searchText = (events) => {
    this.setState({ textSearch: events.target.value });
  };

  doctypeValue = (events) => {
    this.setState({ doctype: events.target.value });
  };

  pageOptionValue = (events) => {
    this.setState({ pageOption: events.target.value });
  };

  DocNameValue = (events) => {
    this.setState({ DocName: events.target.value });
  };

  setAnnDiv = () => {
    this.setState({ selectAnnotationDivShow: false });
    this.setState({ deleteAnnotationDiv: false });
    this.setState({ stampAnnotationSelected: false });
    this.setState({ coordinateAnnotationSelected: false });
    this.setState({ editAnnotationDiv: false });
    this.setState({ getAllRepliesDiv: false });
    this.setState({ imageStampDiv: false });
    this.setState({ multiAnnotationDiv: false });
    this.setState({ updateCommentDiv: false });
    this.setState({ removeReplyDiv: false });
    this.setState({ removeAllReplyDiv: false });
    this.setState({ getuserReplyDiv: false });
    this.setState({ getAllAnnDiv: false });
    this.setState({ getAnnDetailsDiv: false });
    this.setState({ getFilteredAnnDiv: false });
  };

  chooseOption = (event) => {
    var eViewerObj = null;
    eViewerObj = new eViewerApp();
    // console.log(event);
    this.setState({ value: event.target.value });
    this.disableAllDiv();
    this.setAnnDiv();
    switch (event.target.value) {
      case "uploadDocument":
        this.setState({ isUploadDivShow: true });
        // this.submitUploadDetail();
        break;

      case "gotoPage":
        this.setState({ isgotoPageDivShow: true });

        break;
      case "export":
        this.setState({ isExportDivShow: true });

        break;
      case "printDocument":
        let printData = {
          pageOption: "allDocuments", //"currentPage",
          withannotation: "false",
          startPage: 0,
          endPage: 0,
        };
        eViewerObj.editingService.printDocument(printData);
        break;
      case "getPageCount":
        eViewerObj.documentService.getPageCount("").then((response) => {
          console.log("getPageCount: " + response);
        });

        break;
      case "insertDocument":
        this.setState({ isinsertDivShow: true });

        break;
      case "appendDocument":
        this.setState({ isappendDivShow: true });
        break;
      case "viewerPreference":
        this.setViewerOptions();
        break;

      case "newDoc":
        eViewerObj.documentService.newDocument("pdf");
        break;
      case "searchText":
        this.setState({ issearchTextDivShow: true });

        break;

      case "nextPage":
        eViewerObj.documentService.nextPage().then((response) => {
          console.log("nextpage: " + response);
        });

        break;
      case "lastPage":
        eViewerObj.documentService.lastPage().then((response) => {
          console.log("lastPage: " + response);
        });

        break;
      case "prevPage":
        eViewerObj.documentService.prevPage().then((response) => {
          console.log("prevPage: " + response);
        });

        break;

      case "firstPage":
        eViewerObj.documentService.firstPage().then((response) => {
          console.log("firstPage: " + response);
        });
        break;
      case "getOpenDoc":
        eViewerObj.documentService.getOpenDocuments().then((response) => {
          console.log("getOpenDoc: " + response);
        });

        break;
      case "closeFile":
        eViewerObj.documentService.closeDocument("").then((response) => {
          this.setState({ defaultDisabled: false });
          console.log("closeFile: " + response);
        });

        break;
      case "closeAllDoc":
        eViewerObj.documentService.closeAllDocuments("").then((response) => {
          this.setState({ defaultDisabled: false });
          console.log("closeAllDoc: " + response);
        });

        break;

      case "getActiveDoc":
        eViewerObj.documentService.getActiveDocument().then((response) => {
          console.log("getActiveDoc: " + response);
        });
        break;
      case "saveDoc":
        eViewerObj.documentService.saveDocument();
        break;
      case "saveAllDoc":
        eViewerObj.documentService.saveAllDocuments();

        break;

      case "zoomIn":
        eViewerObj.editingService.zoomIn().then((response) => {
          console.log("zoomIn: " + response);
        });

        break;

      case "zoomOut":
        eViewerObj.editingService.zoomOut().then((response) => {
          console.log("zoomOut: " + response);
        });

        break;

      case "rotateClockwise":
        eViewerObj.editingService.rotateClockwise().then((response) => {
          console.log("rotateClockwise: " + response);
        });
        break;
      case "fitToWidth":
        eViewerObj.editingService.zoomTo("Fit To Width").then((response) => {
          console.log("fitToWidth: " + response);
        });
        break;

      case "fitToHeight":
        eViewerObj.editingService.zoomTo("Fit To Height").then((response) => {
          console.log("fitToHeight: " + response);
        });
        break;

      case "fitToWindow":
        eViewerObj.editingService.zoomTo("Fit To Window").then((response) => {
          console.log("fitToWindow: " + response);
        });
        break;

      case "ActualSize":
        eViewerObj.editingService.zoomTo("Actual Size").then((response) => {
          console.log("ActualSize: " + response);
        });
        break;

      case "deletePage":
        eViewerObj.editingService.deletePage().then((response) => {
          console.log("deletePage: " + response);
        });
        break;

      case "copyPage":
        eViewerObj.editingService.copyPage().then((response) => {
          console.log("copyPage: " + response);
        });
        break;

      case "cutPage":
        eViewerObj.editingService.cutPage().then((response) => {
          console.log("cutPage: " + response);
        });
        break;

      case "pastePage":
        eViewerObj.editingService.pastePage().then((response) => {
          console.log("pastePage: " + response);
        });
        break;
      case "switchThumbnail":
        eViewerObj.toggleThumbnail().then((response) => {
          console.log("switchThumbnail: " + response);
        });
        break;

      case "hideAnnotation":
        eViewerObj.hideAnnotations(true).then((response) => {
          console.log("hideAnnotation: " + response);
        });
        break;

      case "hideThumbnails":
        eViewerObj.hideThumbnails(true).then((response) => {
          console.log("hideThumbnails: " + response);
        });
        break;

      case "selectPanning":
        eViewerObj.selectPanning(true).then((response) => {
          console.log("selectPanning: " + response);
        });
        break;

      case "deleteAnnotation":
        this.setState({ deleteAnnotationDiv: true });
        break;

      case "editAnnotation":
        this.setState({ editAnnotationDiv: true });
        break;

      case "getAllReplies":
        this.setState({ getAllRepliesDiv: true });
        break;

      case "multiAnnotation":
        this.setState({ multiAnnotationDiv: true });
        break;

      case "updateComment":
        this.setState({ updateCommentDiv: true });
        break;

      case "removeReply":
        this.setState({ removeReplyDiv: true });
        break;

      case "removeAllReply":
        this.setState({ removeAllReplyDiv: true });
        break;

      case "getUserReply":
        this.setState({ getuserReplyDiv: true });
        break;

      case "getAllAnn":
        this.setState({ getAllAnnDiv: true });
        break;

      case "getAnnDetails":
        this.setState({ getAnnDetailsDiv: true });
        break;

      case "getFilteredAnn":
        this.setState({ getFilteredAnnDiv: true });
        break;

      case "changeButtonState":
        this.changeCustomButtonState();
      default:
        break;
    }
  };

  changeCustomButtonState = () => {
    this.eViewerObj.updateButtons([
      {
        id: "leftdummybt",
        name: "Left Dummy",
        alignment: "leftToolbar",
        iconUrl: "assets/images/mst/custBtn1.png",
        parent: "",
      },
      {
        id: "rightDummydt",
        name: "Right Dummy",
        alignment: "rightToolbar",
        iconUrl: "assets/images/mst/custBtn1.png",
        parent: "",
      },
      {
        id: "ribbonDummyViewbt",
        name: "View Dummy",
        alignment: "ribbonToolbar",
        iconUrl: "assets/images/mst/custBtn1.png",
        parent: "View",
      },
      {
        id: "ribbonDummyInsertbt",
        name: "Insert Dummy",
        alignment: "ribbonToolbar",
        iconUrl: "assets/images/mst/custBtn1.png",
        parent: "Insert",
      },
      {
        id: "ribbonDummyAnnotatebt",
        name: "Annotate Dummy",
        alignment: "ribbonToolbar",
        iconUrl: "assets/images/mst/custBtn1.png",
        parent: "Annotate",
      },
      {
        id: "ribbonDummyRedactbt",
        name: "Redact Dummy",
        alignment: "ribbonToolbar",
        iconUrl: "assets/images/mst/custBtn1.png",
        parent: "Redact",
      },
    ]);
  };

  deleteAnnotation = (event) => {
    event.preventDefault();

    const annId = event.target[0].value;
    const pageNO = Number(event.target[1].value);

    this.eViewerObj = null;
    if (this.eViewerObj === null) {
      this.eViewerObj = new eViewerApp();
    }

    this.eViewerObj.annotationService.deleteShape(pageNO, annId);

    this.isDeleteAnn = false;
    this.setState({ deleteAnnotationDiv: false });
  };

  editAnnotation = (event) => {
    event.preventDefault();

    let options = {
      borderWidth: +event.target[6].value,
      borderColor: event.target[7].value,
      fillColor: event.target[8].value,
      // text: optionValue[3],
      opacity: +event.target[9].value,
      fontFace: event.target[10].value,
      fontSize: +event.target[11].value,
      FontColor: event.target[12].value,
      // image: "BASE64STRING or relative path to image"
    };
    if (
      options.borderWidth === 0 &&
      options.borderColor === "" &&
      options.fillColor === "" &&
      options.opacity === 0 &&
      options.fontFace === "" &&
      options.fontSize === 0 &&
      options.FontColor === ""
    ) {
      options = undefined;
    }

    this.eViewerObj = null;
    if (this.eViewerObj === null) {
      this.eViewerObj = new eViewerApp();
    }
    this.selectedAnnotation.annID = event.target[0].value;
    this.state.pageNO = Number(event.target[1].value);
    this.selectedAnnotation.startX = Number(event.target[2].value);
    this.selectedAnnotation.endX = Number(event.target[3].value);
    this.selectedAnnotation.startY = Number(event.target[4].value);
    this.selectedAnnotation.endY = Number(event.target[5].value);

    let annotationData = {
      X: this.selectedAnnotation.startX,
      Width: this.selectedAnnotation.endX,
      Y: this.selectedAnnotation.startY,
      Height: this.selectedAnnotation.endY,
    };

    this.eViewerObj.annotationService.editShape(
      this.selectedAnnotation.annID,
      this.state.pageNO,
      annotationData,
      options
    );
    this.disableAllDiv();
    this.selectedAnnotation.name = null;
    this.selectedAnnotation.isEditAnn = false;
    this.setState({ editAnnotationDiv: false });
  };

  getAllReply = (event) => {
    event.preventDefault();
    this.selectedAnnotation.annID = event.target[0].value;

    this.eViewerObj.annotationService
      .getAllReplies(this.selectedAnnotation.annID)
      .then((response) => {
        console.log(response);
      });
    this.disableAllDiv();
    this.selectedAnnotation.getAllReplies = false;
    this.setState({ getAllRepliesDiv: false });
  };

  getStamps = () => {
    this.selectedAnnotation.stampDetailsArray = [];
    let stampsArray = this.eViewerObj.annotationService.getStamps();
    this.selectedAnnotation.stampDetailsArray.push(stampsArray);
    if (this.selectedAnnotation.stampDetailsArray[0].length !== 0) {
      setTimeout(() => {
        console.log(stampsArray);
        this.setState({ imageStampDiv: true });
      }, 50);
    }
  };

  ChooseStamp = (event) => {
    const stampValue = event.target.value;
    const stampDetails = this.selectedAnnotation.stampDetailsArray;
    const stampInfo = {
      stampType: "imageStamp",
      info: [],
    };
    for (let stamp of stampDetails[0][0]) {
      if (stamp.stampName === stampValue) {
        stampInfo.info.push(stamp);
      }
    }
    switch (stampValue) {
      case "Approved":
      case "Question":
      case "Warning":
      case "Confidential":
      case "Denied":
      case "Initial":
      case "Initial Left":
      case "Initail Right":
      case "Pending":
      case "Received":
      case "SignHere Left":
      case "SignHere Right":
      case "Urgent":
        this.selectedAnnotation.name = "imageStamp";
        this.eViewerObj.annotationService.selectShape(
          this.selectedAnnotation.name,
          stampInfo
        );
        this.setState({ imageStampDiv: false });
        this.setState({ multiPageCoordinateAnnotationSelected: true });

        break;

      default:
        break;
    }
  };

  MultiPageAnnotation = (event) => {
    this.eViewerObj = null;
    if (this.eViewerObj === null) {
      this.eViewerObj = new eViewerApp();
    }
    let annType;
    annType = event.target.value;
    if (annType != "stamp") this.selectedAnnotation.name = annType;
    if (annType === "stamp") {
      this.setState({ multiPageStampAnnotationSelected: true });
      this.setState({ multiPageCoordinateAnnotationSelected: false });
      this.selectedAnnotation.name = null;
    } else if (annType === "imageStamp") {
      this.setState({ multiAnnotationDiv: false });
      this.setState({ imageStampDiv: true });
      this.getStamps();
    } else if (annType === "Select Annotation") {
      this.setState({ multiPageCoordinateAnnotationSelected: false });
      this.setState({ multiPageStampAnnotationSelected: false });
    } else {
      this.setState({ multiPageCoordinateAnnotationSelected: true });
      this.setState({ multiPageStampAnnotationSelected: false });
      this.eViewerObj.annotationService.selectShape(annType);
    }
  };

  multiPageStampInputSubmited = (event) => {
    this.eViewerObj = null;
    if (this.eViewerObj === null) {
      this.eViewerObj = new eViewerApp();
    }
    let annType = "stamp";
    this.selectedAnnotation.name = "stamp";
    let stampData = {
      stampType: "textStamp",
      info: [],
    };
    stampData.info.push(event.target[0].value);
    this.eViewerObj.annotationService.selectedStamp = "default";
    this.eViewerObj.annotationService.selectShape(annType, stampData);
    this.setState({ multiPageStampAnnotationSelected: false });
    this.setState({ multiPageCoordinateAnnotationSelected: true });
  };

  drawMultiPageAnnotation = (event) => {
    event.preventDefault();

    let options = {
      borderWidth: 0,
      borderColor: "",
      fillColor: "",
      opacity: 0,
      fontFace: "",
      fontSize: 0,
      FontColor: "",
    };
    if (
      this.selectedAnnotation.name === "line" ||
      this.selectedAnnotation.name === "arrow"
    ) {
      options.borderWidth = +event.target[5].value;
      options.borderColor = event.target[6].value;
      options.opacity = +event.target[7].value;
    } else if (
      this.selectedAnnotation.name === "circle" ||
      this.selectedAnnotation.name === "rectangle"
    ) {
      options.borderWidth = +event.target[5].value;
      options.borderColor = event.target[6].value;
      options.opacity = +event.target[7].value;
      options.fillColor = event.target[8].value;
    } else if (this.selectedAnnotation.name === "highlight") {
      options.opacity = +event.target[5].value;
      options.fillColor = event.target[6].value;
    } else if (this.selectedAnnotation.name === "text") {
      options.borderWidth = +event.target[5].value;
      options.borderColor = event.target[6].value;
      options.fillColor = event.target[7].value;
      options.opacity = +event.target[8].value;
      options.fontFace = event.target[9].value;
      options.fontSize = +event.target[10].value;
      options.FontColor = event.target[11].value;
    } else if (this.selectedAnnotation.name === "checkpoint") {
      options.fillColor = event.target[5].value;
    } else if (this.selectedAnnotation.name === "stamp") {
      options.borderWidth = +event.target[5].value;
      options.borderColor = event.target[6].value;
      options.fillColor = event.target[7].value;
      options.fontFace = event.target[8].value;
      options.fontSize = +event.target[9].value;
      options.FontColor = event.target[10].value;
    }
    if (
      (options.borderWidth === 0 || options.borderWidth === undefined) &&
      (options.borderColor === "" || options.borderColor === undefined) &&
      (options.fillColor === "" || options.fillColor === undefined) &&
      (options.opacity === 0 ||
        options.opacity === undefined ||
        isNaN(options.opacity)) &&
      (options.fontFace === "" || options.fontFace === undefined) &&
      (options.fontSize === 0 ||
        options.fontSize === undefined ||
        isNaN(options.fontSize)) &&
      (options.FontColor === "" || options.FontColor === undefined)
    ) {
      options = undefined;
    }

    this.eViewerObj = null;
    if (this.eViewerObj === null) {
      this.eViewerObj = new eViewerApp();
    }

    this.state.pageNO = event.target[0].value;
    let pageArray;
    let pageRange = [];
    if (this.state.pageNO.includes(",")) {
      pageArray = this.state.pageNO.split(",");
      pageArray.forEach((page) => {
        if (page.includes("-")) {
          page = page.split("-");
          let startPage = +page[0];
          const endPage = +page[1];
          for (startPage; startPage <= endPage; startPage++) {
            pageRange.push(startPage);
          }
        } else {
          pageRange.push(+page);
        }
      });
    } else {
      if (this.state.pageNO.includes("-")) {
        pageArray = this.state.pageNO.split("-");
        let startPage = +pageArray[0];
        const endPage = +pageArray[1];
        for (startPage; startPage <= endPage; startPage++) {
          pageRange.push(startPage);
        }
      } else {
        pageRange.push(+this.state.pageNO);
      }
    }
    this.selectedAnnotation.startX = Number(event.target[1].value);
    this.selectedAnnotation.endX = Number(event.target[2].value);
    this.selectedAnnotation.startY = Number(event.target[3].value);
    this.selectedAnnotation.endY = Number(event.target[4].value);

    let annotationData = {
      X: this.selectedAnnotation.startX, //434, //inputData.annCanvasStartX
      Width: this.selectedAnnotation.endX, // 607, //inputData.annCanvasEndX
      Y: this.selectedAnnotation.startY, //299, //inputData.annCanvasStartY
      Height: this.selectedAnnotation.endY, // 446, //inputData.annCanvasEndY
    };

    this.eViewerObj.annotationService.drawShapes(
      pageRange,
      annotationData,
      options
    );
    this.disableAllDiv();
    this.selectedAnnotation.name = null;
    this.selectedAnnotation.multiAnnotation = false;
    this.setState({ multiPageStampAnnotationSelected: false });
    this.setState({ multiPageCoordinateAnnotationSelected: false });
  };

  chooseCR = (event) => {
    let value = event.target.value;
    switch (value) {
      case "comment":
        this.setState({ replyDiv: false });
        this.setState({ addReplyDiv: false });
        this.setState({ commentDiv: true });
        this.selectedAnnotation.comment = true;
        this.selectedAnnotation.reply = false;
        this.selectedAnnotation.addReply = false;
        break;

      case "addReply":
        this.setState({ replyDiv: false });
        this.setState({ commentDiv: false });
        this.setState({ addReplyDiv: true });
        this.selectedAnnotation.comment = false;
        this.selectedAnnotation.reply = false;
        this.selectedAnnotation.addReply = true;
        break;

      case "reply":
        this.setState({ commentDiv: false });
        this.setState({ addReplyDiv: false });
        this.setState({ replyDiv: true });
        this.selectedAnnotation.comment = false;
        this.selectedAnnotation.reply = true;
        this.selectedAnnotation.addReply = false;
        break;
    }
  };

  updateCR = (event) => {
    let textUpdate;
    let replyId;
    let annId;
    if (this.selectedAnnotation.comment) {
      annId = event.target[0].value;
      textUpdate = event.target[1].value;
      this.eViewerObj.annotationService.updateCommentOrReply(
        annId,
        textUpdate,
        replyId
      );
    }
    if (this.selectedAnnotation.reply) {
      annId = event.target[0].value;
      textUpdate = event.target[1].value;
      replyId = event.target[2].value;
      this.eViewerObj.annotationService.updateCommentOrReply(
        annId,
        textUpdate,
        replyId
      );
    }
    if (this.selectedAnnotation.addReply) {
      annId = event.target[0].value;
      textUpdate = event.target[1].value;
      this.eViewerObj.annotationService.addReply(annId, textUpdate);
    }
    this.selectedAnnotation.updateComment = false;
    this.setState({ commentDiv: false });
    this.setState({ replyDiv: false });
    this.setState({ addReplyDiv: false });
  };

  removeReply = (event) => {
    event.preventDefault();
    const replyId = event.target[0].value;
    const annId = event.target[1].value;
    this.eViewerObj.annotationService.removeReply(replyId, annId);
    this.setState({ removeReplyDiv: false });
  };

  removeAllReply = (event) => {
    event.preventDefault();
    const annId = event.target[0].value;
    this.eViewerObj.annotationService.removeAllReplies(annId);
    this.setState({ removeAllReplyDiv: false });
  };

  getUserReply = (event) => {
    event.preventDefault();
    const annId = event.target[0].value;
    this.eViewerObj.annotationService.getReplyByUser(annId).then((response) => {
      console.log(response);
    });
    this.setState({ getuserReplyDiv: false });
  };

  getAllAnnotations = (event) => {
    const username = event.target[0].value;
    this.eViewerObj.annotationService
      .getAllAnnotations(username)
      .then((response) => {
        console.log(response);
      });
    this.setState({ getAllAnnDiv: false });
  };

  getAnnotationDetails = (event) => {
    const annId = event.target[0].value;
    this.eViewerObj.annotationService
      .getAnnotationDetails(annId)
      .then((response) => {
        console.log(response);
      });
    this.setState({ getAnnDetailsDiv: false });
  };

  getFilteredAnnotations = (event) => {
    const username = event.target[0].value;
    const annType = event.target[1].value;
    this.state.pageNO = event.target[2].value;
    let pageArray;
    let pageRange = [];
    if (this.state.pageNO.includes(",")) {
      pageArray = this.state.pageNO.split(",");
      pageArray.forEach((page) => {
        if (page.includes("-")) {
          page = page.split("-");
          let startPage = +page[0];
          const endPage = +page[1];
          for (startPage; startPage <= endPage; startPage++) {
            pageRange.push(startPage);
          }
        } else {
          pageRange.push(+page);
        }
      });
    } else {
      if (this.state.pageNO.includes("-")) {
        pageArray = this.state.pageNO.split("-");
        let startPage = +pageArray[0];
        const endPage = +pageArray[1];
        for (startPage; startPage <= endPage; startPage++) {
          pageRange.push(startPage);
        }
      } else {
        pageRange.push(+this.state.pageNO);
      }
    }
    this.eViewerObj.annotationService
      .getFilteredAnnotations(username, annType, pageRange)
      .then((response) => {
        console.log(response);
      });
    this.setState({ getFilteredAnnDiv: false });
  };

  render() {
    return (
      <>
        <div className="App" data-testid="integration-element">
          {/* <lib-eviewer-lib></lib-eviewer-lib> */}
          <div className="login-box card bg-info div-mst">
            <select
              value={this.state.value}
              className="custom-select"
              name="selectedOption"
              onChange={this.chooseOption}
            >
              <option value="" defaultValue="">
                Select Option
              </option>
              <option
                className="text-dark"
                disabled={this.state.defaultDisabled ? true : false}
                value="uploadDocument"
              >
                Upload Document
              </option>
              <option className="text-dark" value="insertDocument">
                Insert Document
              </option>
              {}
              {}
              <option className="text-dark" value="saveDoc">
                Save
              </option>
              <option className="text-dark" value="saveAllDoc">
                SaveAllDoc
              </option>
              <option className="text-dark" value="nextPage">
                Next Page
              </option>
              <option className="text-dark" value="prevPage">
                PrevPage
              </option>
              <option className="text-dark" value="firstPage">
                FirstPage
              </option>
              <option className="text-dark" value="lastPage">
                LastPage
              </option>
              <option className="text-dark" value="getPageCount">
                GetPageCount
              </option>
              <option className="text-dark" value="getOpenDoc">
                GetOpenDoc
              </option>
              <option className="text-dark" value="getActiveDoc">
                GetActiveDoc
              </option>
              <option className="text-dark" value="closeAllDoc">
                CloseAllDoc
              </option>
              <option className="text-dark" value="closeFile">
                CloseFile
              </option>
              <option className="text-dark" value="zoomIn">
                ZoomIn
              </option>
              <option className="text-dark" value="zoomOut">
                ZoomOut
              </option>
              <option className="text-dark" value="rotateClockwise">
                Rotate Right
              </option>
              <option className="text-dark" value="fitToWidth">
                FitToWidth
              </option>
              <option className="text-dark" value="fitToHeight">
                FitToHeight
              </option>
              <option className="text-dark" value="fitToWindow">
                FitToWindow
              </option>
              <option className="text-dark" value="ActualSize">
                ActualSize
              </option>
              <option className="text-dark" value="deletePage">
                DeletePage
              </option>
              <option className="text-dark" value="copyPage">
                CopyPage
              </option>
              <option className="text-dark" value="cutPage">
                CutPage
              </option>
              <option className="text-dark" value="pastePage">
                PastePage
              </option>
              {}
              <option className="text-dark" value="hideAnnotation">
                HideAnnotation
              </option>
              <option className="text-dark" value="hideThumbnails">
                Hide Thumbnails
              </option>
              <option className="text-dark" value="selectPanning">
                SelectPanning
              </option>
              <option className="text-dark" value="newDoc">
                New Document
              </option>
              <option className="text-dark" value="gotoPage">
                Go to Page
              </option>
              <option className="text-dark" value="export">
                Export
              </option>
              <option className="text-dark" value="searchText">
                Search Text
              </option>
              <option className="text-dark" value="printDocument">
                Print
              </option>
              {}
              <option className="text-dark" value="multiAnnotation">
                Draw Shapes
              </option>
              <option className="text-dark" value="editAnnotation">
                Edit Annotation
              </option>
              <option className="text-dark" value="deleteAnnotation">
                Delete Annotation
              </option>
              <option className="text-dark" value="getUserReply">
                Get User Reply
              </option>
              <option className="text-dark" value="getAllReplies">
                Get All Replies
              </option>
              <option className="text-dark" value="updateComment">
                Update Comment or Reply
              </option>
              <option className="text-dark" value="removeReply">
                Remove Reply
              </option>
              <option className="text-dark" value="removeAllReply">
                Remove All Reply
              </option>
              <option className="text-dark" value="getAllAnn">
                Get All Annotations
              </option>
              <option className="text-dark" value="getAnnDetails">
                Get Annotation Details
              </option>
              <option className="text-dark" value="getFilteredAnn">
                Get Filtered Annotations
              </option>
              <option className="text-dark" value="changeButtonState">
                Update Custom Button State
              </option>
            </select>
          </div>
          {this.state.isUploadDivShow === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <div className="card-body">
                    <div className="form-horizontal">
                      <div className="form-group">
                        <div>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name="docURLs"
                            onChange={this.docURLsValue}
                            value={this.state.docURLs}
                            placeholder="Document Url's"
                            required
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name="annURLs"
                            onChange={this.annURLsValue}
                            value={this.state.annURLs}
                            placeholder="Annotation Url's"
                          />
                        </div>
                        {/* <div>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            name="userName"
                            onChange={this.userNameValue}
                            value={this.state.userName}
                            placeholder="Username"
                            required
                          />
                        </div> */}
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={this.submitUploadDetail}
                      >
                        upload
                      </button>
                      &nbsp;
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {this.state.isgotoPageDivShow === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <div className="card-body">
                    <div className="form-horizontal">
                      <div className="form-group">
                        <div>
                          <input
                            type="number"
                            onChange={this.pageNoValue}
                            value={this.state.pageNO}
                            className="form-control form-control-sm"
                            name="pageNO"
                            placeholder="Enter Page No"
                            required
                          />
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={this.submitGotoPageDetail}
                      >
                        Go
                      </button>
                      &nbsp;
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {this.state.issearchTextDivShow === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <div className="card-body">
                    <form
                      className="form-horizontal"
                      onSubmit={this.submitTextDetail}
                    >
                      <div className="form-group">
                        <div>
                          <input
                            type="text"
                            onChange={this.searchText}
                            value={this.state.textSearch}
                            className="form-control form-control-sm"
                            name="inputText"
                            placeholder="Input Text"
                            required
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Search
                      </button>
                      &nbsp;
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.isinsertDivShow === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <div className="card-body">
                    <form
                      className="form-horizontal"
                      onSubmit={this.submitInsertDetail}
                    >
                      <div className="form-group">
                        <input
                          type="file"
                          className="form-control form-control-sm wrapword"
                          id="fil-id"
                          name="fileURL"
                          onChange={this.actualFilePath}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Insert
                      </button>
                      &nbsp;
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.isappendDivShow === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <div className="card-body">
                    <form
                      className="form-horizontal"
                      onSubmit={this.submitAppendDetail}
                    >
                      <div className="form-group">
                        <input
                          type="file"
                          className="form-control form-control-sm wrapword"
                          id="fil-id"
                          name="fileURL"
                          onChange={this.actualFilePath}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Append Document
                      </button>
                      &nbsp;
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.isExportDivShow === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <div className="card-body">
                    <form
                      className="form-horizontal"
                      onSubmit={this.submitExportDetail}
                    >
                      <div className="form-group">
                        <div>
                          <input
                            type="text"
                            onChange={this.doctypeValue}
                            value={this.state.doctype}
                            className="form-control form-control-sm"
                            name="doctype"
                            placeholder="pdf or tiff"
                            required
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            onChange={this.pageOptionValue}
                            value={this.state.pageOption}
                            className="form-control form-control-sm"
                            name="pageOption"
                            placeholder="currentPage or allDocuments"
                            required
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            onChange={this.DocNameValue}
                            value={this.state.DocName}
                            className="form-control form-control-sm"
                            name="DocName"
                            placeholder="Document Name"
                            required
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Export
                      </button>
                      &nbsp;
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.deleteAnnotationDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form
                    className="form-horizontal"
                    onSubmit={this.deleteAnnotation}
                  >
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annId"
                          placeholder="Enter Annotation Id"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="pageNO"
                          placeholder="Enter Page No"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-danger">
                      Delete Annotation
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.editAnnotationDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form
                    className="form-horizontal"
                    onSubmit={this.editAnnotation}
                  >
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annId"
                          placeholder="Enter Annotation Id"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="pageNO"
                          placeholder="Enter Page No"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annCanvasStartX"
                          placeholder="AnnCanvasStartX"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annCanvasEndX"
                          placeholder="AnnCanvasEndX"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annCanvasStartY"
                          placeholder="AnnCanvasStartY"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annCanvasEndY"
                          placeholder="AnnCanvasEndY"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm col-sm-3"
                          name="borderWidth"
                          placeholder="borderWidth"
                        />
                        <input
                          type="text"
                          className="form-control form-control-sm col-sm-3"
                          name="borderColor"
                          placeholder="borderColor"
                        />
                        <input
                          type="text"
                          className="form-control form-control-sm col-sm-3"
                          name="fillColor"
                          placeholder="fillColor"
                        />
                        <input
                          type="text"
                          className="form-control form-control-sm col-sm-3"
                          name="opacity"
                          placeholder="opacity"
                        />
                        <input
                          type="text"
                          className="form-control form-control-sm col-sm-3"
                          name="fontFace"
                          placeholder="FontFace"
                        />
                        <input
                          type="text"
                          className="form-control form-control-sm col-sm-3"
                          name="fontSize"
                          placeholder="fontSize"
                        />
                        <input
                          type="text"
                          className="form-control form-control-sm col-sm-3"
                          name="fontColor"
                          placeholder="FontColor"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Edit Annotation
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.getAllRepliesDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form className="form-horizontal" onSubmit={this.getAllReply}>
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annId"
                          placeholder="Enter Annotation Id"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Get All Replies
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.imageStampDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <select
                    className="custom-select"
                    name="selectedStamp"
                    onChange={this.ChooseStamp}
                  >
                    <option className="" defaultValue="">
                      Select Stamp
                    </option>
                    {this.selectedAnnotation.stampDetailsArray[0][0].map(
                      (el) => (
                        <option value={el.stampName} key={el.stampName}>
                          {" "}
                          {el.stampName}{" "}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.multiAnnotationDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <select
                    className="custom-select"
                    name="selectedOption"
                    onChange={this.MultiPageAnnotation}
                  >
                    <option className="" defaultValue="">
                      Select Annotation
                    </option>
                    <option className="text-dark" value="line">
                      LINE
                    </option>
                    <option className="text-dark" value="arrow">
                      ARROW
                    </option>
                    <option className="text-dark" value="circle">
                      CIRCLE
                    </option>
                    <option className="text-dark" value="rectangle">
                      RECTANGLE
                    </option>
                    <option className="text-dark" value="highlight">
                      HIGHLIGHT
                    </option>
                    <option className="text-dark" value="text">
                      TEXT
                    </option>
                    <option className="text-dark" value="stickynote">
                      STICKYNOTE
                    </option>
                    <option className="text-dark" value="checkpoint">
                      CHECKPOINT
                    </option>
                    <option className="text-dark" value="stamp">
                      STAMP
                    </option>
                    <option className="text-dark" value="imageStamp">
                      IMAGE STAMP
                    </option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.multiPageCoordinateAnnotationSelected === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form
                    className="form-horizontal"
                    onSubmit={this.drawMultiPageAnnotation}
                  >
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="pageNo"
                          placeholder="Page Range..."
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annCanvasStartX"
                          placeholder="AnnCanvasStartX"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annCanvasEndX"
                          placeholder="AnnCanvasEndX"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annCanvasStartY"
                          placeholder="AnnCanvasStartY"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annCanvasEndY"
                          placeholder="AnnCanvasEndY"
                          required
                        />
                      </div>
                      {(this.selectedAnnotation.name === "line" ||
                        this.selectedAnnotation.name === "arrow") && (
                        <>
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="borderWidth"
                            placeholder="borderWidth"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="borderColor"
                            placeholder="borderColor"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="opacity"
                            placeholder="opacity"
                          />
                        </>
                      )}
                      {(this.selectedAnnotation.name === "circle" ||
                        this.selectedAnnotation.name === "rectangle") && (
                        <>
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="borderWidth"
                            placeholder="borderWidth"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="borderColor"
                            placeholder="borderColor"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="opacity"
                            placeholder="opacity"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="fillColor"
                            placeholder="fillColor"
                          />
                        </>
                      )}
                      {this.selectedAnnotation.name === "highlight" && (
                        <>
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="opacity"
                            placeholder="opacity"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="fillColor"
                            placeholder="fillColor"
                          />
                        </>
                      )}
                      {this.selectedAnnotation.name === "text" && (
                        <>
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="borderWidth"
                            placeholder="borderWidth"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="borderColor"
                            placeholder="borderColor"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="fillColor"
                            placeholder="fillColor"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="opacity"
                            placeholder="opacity"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="fontFace"
                            placeholder="FontFace"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="fontSize"
                            placeholder="fontSize"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="fontColor"
                            placeholder="FontColor"
                          />
                        </>
                      )}
                      {this.selectedAnnotation.name === "checkpoint" && (
                        <>
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="fillColor"
                            placeholder="fillColor"
                          />
                        </>
                      )}
                      {this.selectedAnnotation.name === "stamp" && (
                        <>
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="borderWidth"
                            placeholder="borderWidth"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="borderColor"
                            placeholder="borderColor"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="fillColor"
                            placeholder="fillColor"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="fontFace"
                            placeholder="FontFace"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="fontSize"
                            placeholder="fontSize"
                          />
                          <input
                            type="text"
                            className="form-control form-control-sm col-sm-3"
                            name="fontColor"
                            placeholder="FontColor"
                          />
                        </>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Draw {this.selectedAnnotation.name}
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.multiPageStampAnnotationSelected === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form
                    className="form-horizontal"
                    onSubmit={this.multiPageStampInputSubmited}
                  >
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="inputText"
                          placeholder="Input text"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Ok
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.updateCommentDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <select
                    className="custom-select"
                    name="selectedOption"
                    onChange={this.chooseCR}
                  >
                    <option className="" defaultValue="">
                      Select To Update
                    </option>
                    <option className="text-dark" value="comment">
                      Add / Update Comment
                    </option>
                    <option className="text-dark" value="addReply">
                      Add Reply
                    </option>
                    <option className="text-dark" value="reply">
                      Reply
                    </option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.commentDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form className="form-horizontal" onSubmit={this.updateCR}>
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annId"
                          placeholder="Annotation Id..."
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="updateComment"
                          placeholder="update Comment"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Add / Update Comment
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.replyDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form className="form-horizontal" onSubmit={this.updateCR}>
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annId"
                          placeholder="Annotation Id..."
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="updateReply"
                          placeholder="update Reply"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="replyId"
                          placeholder="Reply Id"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update Reply
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.addReplyDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form className="form-horizontal" onSubmit={this.updateCR}>
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annId"
                          placeholder="Annotation Id..."
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="updateReply"
                          placeholder="Add Reply"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Add Reply
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.removeReplyDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form className="form-horizontal" onSubmit={this.removeReply}>
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="replyId"
                          placeholder="Reply Id"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annId"
                          placeholder="Annotation Id..."
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Remove Reply
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.removeAllReplyDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form
                    className="form-horizontal"
                    onSubmit={this.removeAllReply}
                  >
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annId"
                          placeholder="Annotation Id..."
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Remove All Reply
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.getuserReplyDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form
                    className="form-horizontal"
                    onSubmit={this.getUserReply}
                  >
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annId"
                          placeholder="Annotation Id..."
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Get User Reply
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.getAllAnnDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form
                    className="form-horizontal"
                    onSubmit={this.getAllAnnotations}
                  >
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="userName"
                          placeholder="user name"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Get All Annotations
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.getAnnDetailsDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form
                    className="form-horizontal"
                    onSubmit={this.getAnnotationDetails}
                  >
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annId"
                          placeholder="Annotation Id"
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Get Annotation Details
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.getFilteredAnnDiv === true ? (
            <>
              <div>
                <div className="login-box card bg-info div-mst">
                  <form
                    className="form-horizontal"
                    onSubmit={this.getFilteredAnnotations}
                  >
                    <div className="form-group">
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="userName"
                          placeholder="username"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="annType"
                          placeholder="Annotation Type"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="pageNo"
                          placeholder="page Range"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Get Filtered Annotations
                    </button>
                    &nbsp;
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <hr></hr>
          {}
          <div id="eviewer" style={{ height: "100vh", overflow: "auto" }}></div>
        </div>
      </>
    );
  }
}

export default App;
