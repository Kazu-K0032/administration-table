function onOpen() {
  const ui = SpreadsheetApp.getUi()
  const menu = ui.createMenu("カスタムボタン"); // メニューバーに表示するタイトル
  menu.addItem("やることリストのリセット","resetTasks");
  menu.addToUi() //スプレッドシートに反映
}