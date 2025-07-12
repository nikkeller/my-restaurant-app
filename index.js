// 1. 必要なツールを読み込む
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const port = 3000;

// 2. 静的ファイル（HTMLやCSSなど）を配信するための設定
app.use(express.static("public"));

// 3. 全店舗取得API（マイルストーン3で作成）
app.get("/api/shops", async (req, res) => {
  try {
    const shops = await prisma.shop.findMany();
    res.json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "データベースからの取得に失敗しました。" });
  }
});

// 4. ★★★ 新しいAPI：店舗提案（レコメンド）機能 ★★★
app.get("/api/recommend", async (req, res) => {
  try {
    const { genre, partySize } = req.query; // クエリパラメータからジャンルと人数を取得
    const partySizeNum = parseInt(partySize, 10); // 人数を文字列から数値に変換

    // 検索条件を構築
    const whereClause = {};

    if (genre) {
      whereClause.genre = genre;
    }

    if (partySizeNum) {
      whereClause.partySizeMin = { lte: partySizeNum }; // 最小人数が入力人数以下
      whereClause.partySizeMax = { gte: partySizeNum }; // 最大人数が入力人数以上
    }

    const shops = await prisma.shop.findMany({
      where: whereClause,
    });

    res.json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "検索処理中にエラーが発生しました。" });
  }
});

// 5. サーバーを起動
app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});
