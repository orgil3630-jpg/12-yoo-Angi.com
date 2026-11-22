/**
 * Бүртгэлийн хариуг Google Sheet-д бичих Apps Script.
 * Заавар: README.md → "Google Sheet-д бүртгэл хадгалах" хэсэг.
 */
var SHEET_NAME = 'Бүртгэл';

function safe(v) {
  // Sheet дээр томьёо ажиллахаас хамгаална
  v = (v === undefined || v === null) ? '' : String(v);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Огноо', 'Овог нэр', 'Имэйл', 'Сонголт', 'Зочдын тоо', 'Утас', 'Зурвас']);
  }
  var d = JSON.parse(e.postData.contents);
  var status = { ATTENDING: 'Оролцоно', MAYBE: 'Магадгүй', NOT_ATTENDING: 'Оролцохгүй' }[d.status] || d.status;
  sheet.appendRow([new Date(), safe(d.name), safe(d.email), safe(status), Number(d.guests) || 0, safe(d.phone), safe(d.message)]);
  return ContentService.createTextOutput('ok');
}
