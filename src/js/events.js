import eViewerApp from "@mstechusa/eviewer7/js/eViewer7";

window._docLoadComplete = function (docInfo) {
  try {
    console.log("docLoadComplete Info Below: ");
    console.log(docInfo);
  } catch (exp) {}
};

window._firstPageRendered = function (docID, time) {
  try {
    console.log(
      "firstPageRendered for documentID: " + docID + " in " + time + "ms"
    );
  } catch (exp) {}
};

window._customButtonClicked = function (operation) {
  try {
    console.log("Mesage from react app: " + operation);
  } catch (exp) {}
};

window._docSaveComplete = function (docID, response) {
  try {
    console.log("docSaveComplete: " + docID + " response: " + response);
  } catch (exp) {}
};

window._docDropped = function (docID) {
  try {
    console.log("docDropped: " + docID);
  } catch (exp) {}
};

window._annCreated = function (docID, annID, pageNo) {
  try {
    console.log(
      "annCreated: docID " + docID + " annID: " + annID + " pageNo: " + pageNo
    );
  } catch (exp) {}
};

window._annDeleted = function (docID, annID, pageNo) {
  try {
    console.log(
      "annDeleted: docID " + docID + " annID: " + annID + " pageNo: " + pageNo
    );
  } catch (exp) {}
};

window._annPropUpdated = function (docID, pageNo, annID, annProperty) {
  try {
    console.log(
      "annPropUpdated: docID " +
        docID +
        " annID: " +
        annID +
        " annProperty: " +
        annProperty
    );
  } catch (exp) {}
};

window._buttonAnnClicked = function (docID, annID, pageNo, buttonText) {
  try {
    console.log(
      "buttonAnnClicked: docID " +
        docID +
        " annID: " +
        annID +
        " pageNo: " +
        pageNo +
        " buttonText: " +
        buttonText
    );
  } catch (exp) {}
};

window._pageChanged = function (docID, pageNo) {
  try {
    console.log("pageChanged: " + docID + " current pageNo: " + pageNo);
  } catch (exp) {}
};

window._docExported = function (docID, selectedOption) {
  try {
    console.log("docExported: " + docID + " selectedOption: " + selectedOption);
  } catch (exp) {}
};

window._pageDeleted = function (docID, pageNo) {
  try {
    console.log("pageDeleted: " + docID + " current pageNo: " + pageNo);
  } catch (exp) {}
};

window._pageCut = function (docID, pageNo) {
  try {
    console.log("pageCut: " + docID + " currnet pageNo: " + pageNo);
  } catch (exp) {}
};

window._pageCopied = function (docID, pageNo) {
  try {
    console.log("pageCopied: " + docID + " current pageNo: " + pageNo);
  } catch (exp) {}
};

window._pagePasted = function (docID, pageNo) {
  try {
    console.log("pagePasted: " + docID + " current pageNo: " + pageNo);
  } catch (exp) {}
};

window._textSelected = function (response) {
  try {
    console.log(response);

    /*if (response !== undefined && response.coordinates !== undefined) {
      let eViewerObj = new eViewerApp();
      response.coordinates.forEach((element) => {
        let pageRange = [];
        pageRange.push(response.page);
        let annotationData = {
          X: element.x1,
          Width: element.x2,
          Y: element.y1,
          Height: element.y3,
        };
        eViewerObj.annotationService.selectShape("highlight");
        eViewerObj.annotationService.drawShapes(pageRange, annotationData);
      });
    }*/
  } catch (exp) {}
};

window._newCertificate = function (certificate) {
  try {
    /*
	{ userName: "", certificate: "BASE64 certificate", commonName: "", expiry: "", issuedBy: "", password: "" }
	*/
    console.log(certificate);
  } catch (exp) {}
};

window._newAppearance = function (appearance) {
  try {
    /*
	{ userName: "", appearanceImg: "BASE64 image" }
	*/
    console.log(appearance);
  } catch (exp) {}
};

window._preferenceUpdate = function (preferenceData) {
  try {
    /*
    { userName: "", userPreference: "", annotationPreference: "", customStamps: ""}
    */
    console.log(preferenceData);
  } catch (exp) {}
};

window._zoomChange = function (zoomData) {
  try {
    /*
      { clientDocID: "", docID: "", scale: "", zoomPreset: ""}
      */
    console.log(zoomData);
  } catch (exp) {}
};

window._onContextMenu = function (info) {
  try {
    console.log(info);
  } catch (exp) {}
}