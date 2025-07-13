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
// index.js の /api/recommend エンドポイント

app.get("/api/recommend", async (req, res) => {
  try {
    const { genre, partySize, money, sortBy } = req.query;

    // --- 検索条件（WHERE句）の構築 ---
    const whereClause = {};

    // 1. ジャンルでの絞り込み
    if (genre) {
      // genreが空文字""でない場合のみ条件に追加
      whereClause.genre = genre;
    }

    // 2. 人数での絞り込み
    const partySizeNum = parseInt(partySize, 10);
    // 有効な数値（NaNではなく、0より大きい）の場合のみ条件に追加
    if (!isNaN(partySizeNum) && partySizeNum > 0) {
      whereClause.partySizeMin = { lte: partySizeNum };
      whereClause.partySizeMax = { gte: partySizeNum };
    }

    // 3. 金額での絞り込み
    const moneyNum = parseInt(money, 10);
    // ★★★ここが重要：有効な数値（NaNではなく、0より大きい）の場合のみ条件に追加
    if (!isNaN(moneyNum) && moneyNum > 0) {
      whereClause.money = { lte: moneyNum }; // 'money'カラムが入力金額以下
    }

    // --- 並び替え条件（ORDER BY句）の構築 ---
    const orderByClause = [];

    // ★★★ここが重要：「安い順」が選択された場合の処理
    if (sortBy === "money_asc") {
      orderByClause.push({ money: "asc" });
    } else if (sortBy === "rating") {
      orderByClause.push({ googleRating: "desc" });
    }

    // --- データベース検索の実行 ---
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
