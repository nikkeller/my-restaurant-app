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

// 4. 店舗提案（レコメンド）機能API
app.get("/api/recommend", async (req, res) => {
  try {
    const { genre, partySize, sortBy } = req.query;
    const partySizeNum = parseInt(partySize, 10);

    const whereClause = {};

    // ★ 修正点1: ジャンルの値が空文字でないことを明確にチェック
    if (genre && genre !== "") {
      whereClause.genre = genre;
    }

    if (partySizeNum) {
      whereClause.partySizeMin = { lte: partySizeNum };
      whereClause.partySizeMax = { gte: partySizeNum };
    }

    const orderByClause = {};
    // ★ 修正点2: sortByの値が'rating'の場合の処理を確実にする
    if (sortBy === "rating") {
      orderByClause.googleRating = "desc";
    }

    const shops = await prisma.shop.findMany({
      where: whereClause,
      orderBy: orderByClause,
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
