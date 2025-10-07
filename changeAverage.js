/**
 * トリガー有：編集時
 * 『やることリスト（毎月）』の『進捗』列の値を変更した際、すべての値の平均値をC列のタイトルに反映させる関数
 */
function changeAverage() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("やることリスト（毎月）")
  if (!sheet.getName() == "やることリスト（毎月）") return

  const titleValues = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues().flat()
  const judgeSrcColumn = ["進捗"]
  let setting_title = getColumnValues(sheet, titleValues, judgeSrcColumn).flat()
  console.log("setting_title", setting_title, setting_title.length)

  let sum = 0
  let avr = 0
  for (let i = 0; i < setting_title.length; i++) {
    let num = setting_title[i]
    if (num === "") { num = 0 }
    if (typeof num === "string") num = Number(num)
    sum += num
  }
  avr = (sum / setting_title.length) * 100
  avr = avr.toFixed(2)
  console.log(sum, avr)
  sheet.getRange(1, 3).setValue(`内容（${avr}％）`)
}
