/**
 * 『やることリスト（毎月）』シートに対し、『進捗』列の値を全て「０％」に変更する関数
 */
function reset_todoList() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (!sheet.getName() == "やることリスト（毎月）") return
  if (!confirmAndExecute()) return

  const titleValues = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues().flat()
  const judgeSrcColumn = ["進捗"]
  let setting_title = getColumnValues(sheet, titleValues, judgeSrcColumn).flat()

  const next_resetValues = []
  for (let i = 0; i < setting_title.length; i++) {
    const resetData = ["０%"]
    next_resetValues.push(resetData)
  }
  const targetColumn = getColumnNumber(titleValues, judgeSrcColumn)
  sheet.getRange(2, targetColumn[0]["column"], next_resetValues.length, 1).setValues(next_resetValues)
}