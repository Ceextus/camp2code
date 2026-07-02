/**
 * Camp2Code — registration → Google Sheet webhook.
 *
 * Paste this into the Apps Script editor bound to your registrations sheet
 * (Extensions → Apps Script), then deploy it as a Web App. See
 * docs/google-sheets.md for the full step-by-step.
 *
 * It appends one row per registration. The header row is created automatically
 * on the first submission if the sheet is empty.
 */

// Order of columns written to the sheet.
var HEADERS = [
  "Timestamp",
  "Full Name",
  "Age",
  "Phone",
  "Email",
  "Location",
  "Tracks",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Write the header row once, if the sheet is brand new.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    var targetRow = sheet.getLastRow() + 1;
    var range = sheet.getRange(targetRow, 1, 1, HEADERS.length);

    // Force the Phone column to plain text BEFORE writing. A phone like
    // "+2348012345678" starts with "+", which Sheets otherwise treats as a
    // formula → "Formula parse error". Text format also preserves leading 0s.
    sheet.getRange(targetRow, 4).setNumberFormat("@");

    range.setValues([
      [
        new Date(),
        data.fullName || "",
        data.age || "",
        data.phone || "",
        data.email || "",
        data.location || "",
        data.tracks || "",
      ],
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
