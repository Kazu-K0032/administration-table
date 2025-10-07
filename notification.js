/**
 * トリガー有：毎週月曜日７時～８時
 * 『やることリスト（毎月）』シートの達成されていないものを通知する関数
 */
function alert_Pending_Tasks() {
  const sheet = getSheet("やることリスト（毎月）");
  const titleValues = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues().flat()
  let setting_title = [/内容（/, /進捗/]
  setting_title = preg_getColumnNumber(titleValues, setting_title)

  /**
   * 	[ { title: '内容（75.93％）', column: 3 },   { title: '進捗', column: 4 } ]
   */
  const values_content = sheet.getRange(2, setting_title[0]["column"], sheet.getLastRow()).getValues().flat()
  const values_percent = sheet.getRange(2, setting_title[1]["column"], sheet.getLastRow()).getValues().flat()
  let message = ""
  let rest_counter = 0

  // 『進捗』列を参照し、１００％以外の行があれば『内容』列の値を設置する
  for (let i = 0; i < values_content.length; i++) {
    const content = values_content[i]
    const percent = values_percent[i]
    if (content === "") { break }
    if (percent == "1") { continue }
    message += (`・${content}（${percent * 100}％）`)
    if ((i + 1) !== values_content.length) {
      message += "\n"
    }
    rest_counter++
  }
  if (message === "") return
  const header = `↓↓↓ 今月残っているタスク（${rest_counter}個） ↓↓↓`;
  message = "\n" + header + "\n" + message;
  console.log("LINE本文（message）", message)
  send_LINE(message) // LINEに通知
}

/**
 * LINEに通知する関数
 * @param {string} body - 通知する本文内容
 */
function send_LINE(body) {
  const token = 'LINE_API_TOKEN';
  const lineNotifyApi = 'https://notify-api.line.me/api/notify';
  const options = {
    "method": "post",
    "payload": { "message": body },
    "headers": { "Authorization": "Bearer " + token }
  };

  UrlFetchApp.fetch(lineNotifyApi, options);
}
