const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // 既存のデータを削除
  await prisma.shop.deleteMany();
  console.log("Deleted existing shops.");

  // 投入するダミーデータ
  const shopsData = [
    {
      name: "イタリアン酒場 Oasi",
      genre: "イタリアン",
      partySizeMin: 2,
      partySizeMax: 8,
      seatingCapacity: 20,
      googleRating: 4.3,
    },
    {
      name: "焼肉ライク 日吉店",
      genre: "焼肉",
      partySizeMin: 1,
      partySizeMax: 4,
      seatingCapacity: 30,
      googleRating: 4.0,
    },
    {
      name: "中華そば 盛昭軒",
      genre: "ラーメン",
      partySizeMin: 1,
      partySizeMax: 3,
      seatingCapacity: 12,
      googleRating: 4.5,
    },
    {
      name: "とんかつ三田",
      genre: "和食",
      partySizeMin: 1,
      partySizeMax: 6,
      seatingCapacity: 25,
      googleRating: 4.6,
    },
    {
      name: "アジアンビストロ Dai 日吉店",
      genre: "アジア料理",
      partySizeMin: 2,
      partySizeMax: 10,
      seatingCapacity: 40,
      googleRating: 4.2,
    },
    // ...ここに好きなだけ店舗データを追加できます
  ];

  await prisma.shop.createMany({
    data: shopsData,
  });
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
