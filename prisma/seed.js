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
      name: "ド・マーレ湘南日吉店",
      genre: "イタリアン",
      partySizeMin: 1,
      partySizeMax: 8,
      seatingCapacity: 20,
      googleRating: 4.0,
    },
    {
      name: "からやま  日吉店",
      genre: "定食",
      partySizeMin: 1,
      partySizeMax: 8,
      seatingCapacity: 21,
      googleRating: 3.4,
    },
    {
      name: "ガットン  日吉店",
      genre: "ラーメン",
      partySizeMin: 1,
      partySizeMax: 5,
      seatingCapacity: 12,
      googleRating: 3.9,
    },
    {
      name: "洋食とらひげ",
      genre: "定食",
      partySizeMin: 1,
      partySizeMax: 6,
      seatingCapacity: 25,
      googleRating: 4.0,
    },
    {
      name: "小青蓮 日吉店",
      genre: "中華料理",
      partySizeMin: 2,
      partySizeMax: 10,
      seatingCapacity: 40,
      googleRating: 3.8,
    },
    {
      name: "花木流味噌  日吉店",
      genre: "ラーメン",
      partySizeMin: 1,
      partySizeMax: 8,
      seatingCapacity: 28,
      googleRating: 3.8,
    },
    {
      name: "日高屋 日吉西口店",
      genre: "中華料理",
      partySizeMin: 1,
      partySizeMax: 4,
      seatingCapacity: 20,
      googleRating: 3.8,
    },
    {
      name: "麺場　ハマトラ 日吉店",
      genre: "ラーメン",
      partySizeMin: 1,
      partySizeMax: 8,
      seatingCapacity: 28,
      googleRating: 3.8,
    },
    {
      name: "麺屋こころ日吉店",
      genre: "まぜそば",
      partySizeMin: 1,
      partySizeMax: 8,
      seatingCapacity: 28,
      googleRating: 3.8,
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
