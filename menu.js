function onOpen() {
  const ui = SpreadsheetApp.getUi()
  const menu = ui.createMenu("カスタムボタン"); // メニューバーに表示するタイトル
  menu.addItem("やることリストのリセット","reset_todoList");
  menu.addToUi() //スプレッドシートに反映
}