// 1. 必要なツールを読み込む
const express = require("express");
const app = express();
const port = 3000;

// 2. 「ルートパス(/)にアクセスがあったら、'Hello World!'と応答する」というルールを設定
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 3. サーバーを起動し、待機状態にする
app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});
