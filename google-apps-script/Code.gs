const SPREADSHEET_ID = "1vjF9IBh0tjQDrOw2Y5nSaDbaAQJqil7gsbHyJ5MJCtw";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();

    const now = new Date();
    const timeZone = "America/Mexico_City";
    const fecha = Utilities.formatDate(now, timeZone, "dd/MM/yyyy");
    const hora = Utilities.formatDate(now, timeZone, "HH:mm:ss");

    const rowData = [
      fecha,
      hora,
      data.nombre || "",
      data.correo || "",
      data.asunto || "",
      data.mensaje || "",
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Datos guardados correctamente",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
