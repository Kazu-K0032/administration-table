/**
 * トリガー有：毎週月曜日７時～８時
 * 『やることリスト（毎月）』シートの達成されていないものを通知する関数
 */
function notificationUncompletedTasks() {
  const sheet = getSheet(SHEET_NAMES.MONTHLY_TASK_LIST);
  const titleValues = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues().flat()
  let setting_title = [REGEX_PATTERNS.CONTENT_WITH_PERCENT, REGEX_PATTERNS.PROGRESS]
  setting_title = getColumnNumberWithRegex(titleValues, setting_title)

  /**
   * 	[ { title: '内容（75.93％）', column: 3 },   { title: '進捗', column: 4 } ]
   */
  const values_content = sheet.getRange(2, setting_title[0]["column"], sheet.getLastRow()).getValues().flat()
  const values_percent = sheet.getRange(2, setting_title[1]["column"], sheet.getLastRow()).getValues().flat()
  let message = ""
  let rest_counter = 0

  // 『進捗』列を参照し、100％以外の行があれば『内容』列の値を設置する
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
  send2Line(message) // LINEに通知
}

/**
 * LINEに通知する関数
 * @param {string} body - 通知する本文内容
 */
function send2Line(body) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty(LINE_CONFIG.TOKEN_PROPERTY);

  const payload = {
    messages: [
      { type: 'text', text: body }
    ]
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    headers: { Authorization: "Bearer " + token },
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(LINE_CONFIG.ENDPOINT, options);
  const code = response.getResponseCode();
  if (code < 200 || code >= 300) {
    console.error(MESSAGES.LINE_BROADCAST_FAILED, code, response.getContentText());
  }
}
