/**
 * 単体のシートを取得する関数
 * @param {string} sheetName - シート名
 */
function getSheet(sheetName) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

/**
 * 入力したタイトルのカラム数を出力する関数
 * @param {Array.<string>} titleValues - 対象シートの全タイトル
 * @param {Array.<string>} setting_title - カラム数を返したいタイトル
 * @param {Array.<Object>} - [{"title": "出力したいタイトル名", "column": "出力したいタイトルのカラム数"}]
 */
function getColumnNumber(titleValues, setting_title) {
  const result = [];
  for (let i = 0; i < setting_title.length; i++) {
    const index = titleValues.indexOf(setting_title[i]);
    if (index !== -1) {
      result.push({
        "title": setting_title[i],
        "column": index + 1
      });
    } else {
      throw new Error(`『${setting_title[i]}』は
    『${titleValues}』
    に存在しない値です`)
    }
  }
  return result;
}

/**
 * 入力したタイトルのカラム数を、正規表現を使って出力する関数
 * @param {Array.<string>} titleValues - 対象シートの全タイトル
 * @param {Array.<number>} setting_title - カラム数を返したいタイトルにあたる正規表現
 * @param {Array.<Object>} - [{"title": "出力したいタイトル名", "column": "出力したいタイトルのカラム数"}]
 */
function getColumnNumberWithRegex(titleValues, setting_title) {
  const result = [];
  for (let i = 0; i < setting_title.length; i++) {
    const preg_targetTitle = setting_title[i];
    console.log(preg_targetTitle)
    for (let p = 0; p < titleValues.length; p++) {
      if (titleValues[p].match(preg_targetTitle)) {
        result.push({
          "title": titleValues[p],
          "column": p + 1
        })
        break
      }
      if (p + 1 === titleValues.length) {
        throw new Error(`
        『${preg_targetTitle}』は
        『${titleValues}』
         にマッチしない値です
        `)
      }
    }
  }
  return result;
}

/**
 * 各要素に対応する値を返す関数
 * @param {SpreadsheetApp.Sheet} sheet - シート情報
 * @param {Array.<string>} titleValues - 対象シートのタイトルに当たる配列
 * @param {Array.<string>} judgeSrcColumn - 出力したいタイトルに当たる配列
 * @param {Number} startRow - 取得を開始する行番号（既定は2）
 * @return {Array.<Array.<string>>} - judgeSrcColumn引数に対応する列の値が格納された配列
 */
function getColumnValues(sheet, titleValues, judgeSrcColumn, startRow = 2) {
  const getColumnValues_List = []
  let row_DC_name = ""
  for (let c = 0; c < judgeSrcColumn.length; c++) {
    const columnName = judgeSrcColumn[c]
    const columnNumber = titleValues.indexOf(columnName) + 1
    if (c == 0) row_DC_name = sheet.getRange(startRow, columnNumber).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow() - (startRow - (startRow - 1));
    const values = sheet.getRange(startRow, columnNumber, row_DC_name, 1).getValues().flat()
    const nextValues = convertStr(values)
    getColumnValues_List.push(nextValues)
  }
  return getColumnValues_List
}

/**
 * 配列の値をすべてstring形に変更する関数
 * @param {Array} values - 要素の入った配列
 * @return {Array.<string>} - 全要素がstring型に変換されたリスト
 */
function convertStr(values) {
  const nextValues = []
  for (let v = 0; v < values.length; v++) {
    let value = values[v]
    if ((value == null) || (value == undefined) || isNaN(value)) value = ""
    if (typeof value !== "string") value = String(value)
    nextValues.push(value)
  }
  return nextValues
}

/**
 * 実行するかどうかを確認する関数
 * @returns {boolean} - 実行するかどうか
 */
function confirmAndExecute() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert('本当に実行しますか？', ui.ButtonSet.YES_NO);

  if (response == ui.Button.YES) {
    return true
  } else {
    return false
  }
}

/**
 * 列番号をアルファベットに変換する関数
 * @param {number} e - 列番号
 * @return {String} - 列タイトル
 */
function convertFromNumToAlpha(e) {
  return CONSTANTS.ALPHABET_COLUMNS[e - 1] || null;
}
