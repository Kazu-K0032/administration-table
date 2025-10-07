/**
 * 編集内容を出力する関数
 */
function onEdit(e) {
  const sheetName = e.source.getSheetName();
  if (CONSTANTS.INVALID_SHEETS.includes(sheetName)) { return };

  const sheet = e.source.getActiveSheet();
  const editedCell = sheet.getActiveCell();
  const row = e.range.getRow();
  const col = e.range.getColumn();
  const columnName = convertFromNumToAlpha(col)
  console.log("columnName", columnName)
  const oldValue = e.oldValue; // 変更前の値
  const newValue = editedCell.getValue(); // 変更後の値

  const titleValues = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues().flat()
  let setting_title = [COLUMN_NAMES.BEFORE_VALUE, COLUMN_NAMES.AFTER_VALUE, COLUMN_NAMES.ACCOUNT_NAME, COLUMN_NAMES.LAST_UPDATE]
  setting_title = getColumnNumber(titleValues, setting_title)

  const user_Email = Session.getActiveUser().getEmail();
  console.log(`行数：${row}, 列数：${col}, アカウント：${user_Email}, シート名：${sheetName}, 最終更新日：${new Date()}`)

  if (row > 1 && col < setting_title[0]["column"]) {
    console.log("変更内容: " + oldValue + " => 変更後の内容: " + newValue);
    if (!(e.range.isBlank())) {
      const dataList = [[`${columnName}列：${oldValue}`, `${columnName}列：${newValue}`, user_Email, new Date(),]]
      sheet.getRange(row, setting_title[0]["column"], 1, dataList[0].length).setValues(dataList);
    }
    else {
      const dataList = [["", "", "", ""]]
      sheet.getRange(row, setting_title[0]["column"], 1, dataList[0].length).setValues(dataList);
    }
  }
}
