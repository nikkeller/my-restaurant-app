// 1. 必要なツールを読み込む
const express = require("express");
const { PrismaClient } = require("@prisma/client"); // PrismaClientをインポート

const app = express();
const prisma = new PrismaClient(); // PrismaClientのインスタンスを作成
const port = 3000;

// 2. 静的ファイル（HTMLやCSSなど）を配信するための設定
// 'public'フォルダの中身をウェブに公開する
app.use(express.static("public"));

// 3. APIエンドポイントの作成
//「/api/shops」にアクセスがあったら、全店舗のデータをJSON形式で返す
app.get("/api/shops", async (req, res) => {
  try {
    const shops = await prisma.shop.findMany(); // データベースから全店舗のデータを取得
    res.json(shops); // JSON形式でクライアントに応答
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "データベースからの取得に失敗しました。" });
  }
});

// 4. サーバーを起動し、待機状態にする
app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});
