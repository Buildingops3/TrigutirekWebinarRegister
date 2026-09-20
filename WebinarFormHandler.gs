/**
 * TriGutirek XR Webinar Registration - Form Handler
 * Paste this into Extensions > Apps Script (bound to your Google Sheet).
 * Column order in the sheet must be:
 * Timestamp | Full Name | Specialty | Territory | Institution | SCFHS | Email | WhatsApp | Consent
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the JSON body sent from the landing page
    var data = JSON.parse(e.postData.contents);

    // Basic server-side safety net: don't record a row with no consent
    if (data.consent !== true) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: "error", message: "Consent not provided" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      new Date(),                 // Timestamp (server time, most reliable)
      data.fullName || "",
      data.specialty || "",
      data.territory || "",
      data.institution || "",
      data.scfhs || "",
      data.email || "",
      data.whatsapp || "",
      data.consent === true ? "Yes" : "No"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: lets you sanity-check the deployment by visiting the
 * Web App URL directly in a browser (GET request) without submitting the form.
 */
function doGet(e) {
  return ContentService
    .createTextOutput("TriGutirek XR webinar registration handler is live.")
    .setMimeType(ContentService.MimeType.TEXT);
}
