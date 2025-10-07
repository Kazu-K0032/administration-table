/**
 * 定数管理ファイル
 */

// シート名
const SHEET_NAMES = {
  MONTHLY_TASK_LIST: "やることリスト（毎月）",
  TEMPLATE: "テンプレート"
};

// 列名
const COLUMN_NAMES = {
  CONTENT: "内容",
  PROGRESS: "進捗",
  BEFORE_VALUE: "変更前の値",
  AFTER_VALUE: "変更後の値",
  ACCOUNT_NAME: "アカウント名",
  LAST_UPDATE: "最終更新日"
};

// メッセージ
const MESSAGES = {
  CONFIRM_EXECUTION: "本当に実行しますか？",
  TASK_RESET_VALUE: "０%",
  LINE_BROADCAST_FAILED: "LINE Messaging API broadcast 失敗"
};

// 正規表現パターン
const REGEX_PATTERNS = {
  CONTENT_WITH_PERCENT: /内容（/,
  PROGRESS: /進捗/
};

// その他の定数
const CONSTANTS = {
  START_ROW: 2,
  CONTENT_COLUMN: 3,
  ALPHABET_COLUMNS: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  INVALID_SHEETS: ['テンプレート'],
  PROGRESS_COLUMNS: ["進捗"],
  RESET_DATA: ["０%"]
};

// LINE API設定
const LINE_CONFIG = {
  ENDPOINT: 'https://api.line.me/v2/bot/message/broadcast',
  TOKEN_PROPERTY: "LINE_CHANNEL_ACCESS_TOKEN"
};
