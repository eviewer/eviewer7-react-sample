window._docLoadComplete = function (docID, time) {
  try {
    console.log(
      "docLoadComplete for documentID: " + docID + " in " + time + "ms"
    );
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

window._docSaveComplete = function (docID, annotationData) {
  try {
    console.log("docSaveComplete: " + docID + " annData: " + annotationData);
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