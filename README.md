# Administration-Table

[English](./docs/lang/en.md) | 日本語

Google Apps Scriptを使用した管理テーブル自動化プロジェクトです。

スプレッドシートの「やることリスト」を管理し、LINE Messaging APIによる通知機能を提供します。

## 📋 プロジェクト概要

このプロジェクトは以下の機能を提供します：

- **やることリスト管理**: 月次のタスク進捗を追跡
- **自動通知**: 未完了タスクの週次通知（LINE Messaging API）
- **進捗計算**: タスクの平均進捗率を自動計算
- **リセット機能**: 月次タスクの進捗をリセット
- **編集履歴**: スプレッドシートの変更履歴を記録

## 🚀 セットアップ手順

### 前提条件

- Node.js (v14以上)
- Googleアカウント
- LINE Messaging APIアカウント（通知機能を使用する場合）

### 1. リポジトリのクローン

```bash
git clone <repository-url> administration-table
cd administration-table
```

### 2. 依存関係のインストール

```bash
pnpm install
# または
npm install
```

### 3. Google Apps Script APIの有効化

1. [Google Apps Script設定ページ](https://script.google.com/home/usersettings)にアクセス
2. 「Google Apps Script API」を有効化

### 4. claspのログイン

```bash
npx clasp login
```

### 5. プロジェクトの設定

`.clasp.json`ファイルが正しく設定されていることを確認：

```json
{
  "scriptId": "YOUR_SCRIPT_ID",
  "rootDir": "."
}
```

### 6. LINE Messaging APIトークンの設定

1. [LINE Developers Console](https://developers.line.biz/)でチャンネルアクセストークンを生成
2. Google Apps Scriptのプロパティサービスにトークンを設定

### 7. プロジェクトのデプロイ

```bash
npx clasp push
```

## 📁 ファイル構成

```markdown
administration-table/
├── appsscript.json         # Apps Script設定
├── changeAverage.js        # 進捗率計算機能
├── constants.js            # 定数管理
├── menu.js                 # カスタムメニュー
├── notification.js         # LINE通知機能
├── onEdit.js               # 編集履歴記録
├── resetTasks.js           # タスクリセット機能
├── utils.js                # 共通ユーティリティ関数
├── package.json            # Node.js依存関係
└── README.md               # このファイル
```

## 🔧 機能詳細

### 1. 進捗率自動計算 (`changeAverage.js`)

- スプレッドシートの「進捗」列の値を監視
- 平均進捗率を「内容（XX％）」として表示

### 2. LINE通知 (`notification.js`)

- 毎週月曜日7-8時に未完了タスクを通知
- 進捗率100％未満のタスクを抽出してLINE Messaging APIで送信

### 3. タスクリセット (`resetTasks.js`)

- 月次タスクの進捗を「０％」にリセット
- 確認ダイアログ付き

### 4. 編集履歴 (`onEdit.js`)

- スプレッドシートの変更を自動記録
- 変更者、変更内容、日時を追跡

## ⚙️ 設定

### トリガー設定

以下のトリガーをGoogle Apps Scriptで設定してください：

1. **週次通知**: `notificationUncompletedTasks`関数
   - 実行頻度: 週次
   - 曜日: 月曜日
   - 時間: 7:00-8:00

2. **編集時実行**: `changeAverage`関数
   - 実行頻度: 編集時

### スプレッドシート要件

- シート名: 「やることリスト（毎月）」
- 必須列: 「内容」「進捗」
- 進捗列の値: 0-1の数値（0=0%, 1=100%）
