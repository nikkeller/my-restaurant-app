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
      money: 1500,
      street: "浜銀通り",
    },
    {
      name: "からやま  日吉店",
      genre: "定食",
      partySizeMin: 1,
      partySizeMax: 8,
      seatingCapacity: 21,
      googleRating: 3.4,
      money: 900,
      street: "日吉中央通り",
    },
    {
      name: "ガットン  日吉店",
      genre: "ラーメン",
      partySizeMin: 1,
      partySizeMax: 5,
      seatingCapacity: 12,
      googleRating: 3.9,
      money: 900,
      street: "浜銀通り",
    },
    {
      name: "洋食とらひげ",
      genre: "定食",
      partySizeMin: 1,
      partySizeMax: 6,
      seatingCapacity: 25,
      googleRating: 4.0,
      money: 1000,
      street: "日吉中央通り",
    },
    {
      name: "小青蓮 日吉店",
      genre: "中華料理",
      partySizeMin: 2,
      partySizeMax: 10,
      seatingCapacity: 40,
      googleRating: 3.8,
      money: 1500,
      street: "浜銀通り",
    },
    {
      name: "花木流味噌  日吉店",
      genre: "ラーメン",
      partySizeMin: 1,
      partySizeMax: 8,
      seatingCapacity: 28,
      googleRating: 3.8,
      money: 900,
      street: "日吉中央通り",
    },
    {
      name: "日高屋 日吉西口店",
      genre: "中華料理",
      partySizeMin: 1,
      partySizeMax: 4,
      seatingCapacity: 20,
      googleRating: 3.4,
      money: 900,
      street: "普通部通り",
    },
    {
      name: "麺場　ハマトラ 日吉店",
      genre: "ラーメン",
      partySizeMin: 1,
      partySizeMax: 8,
      seatingCapacity: 28,
      googleRating: 4.0,
      money: 900,
      street: "浜銀通り",
    },
    {
      name: "麺屋こころ日吉店",
      genre: "まぜそば",
      partySizeMin: 1,
      partySizeMax: 8,
      seatingCapacity: 28,
      googleRating: 4.0,
      money: 1000,
      street: "普通部通り",
    },
    {
      name: "松屋　日吉店",
      genre: "牛丼",
      partySizeMin: 1,
      partySizeMax: 4,
      seatingCapacity: 28,
      googleRating: 3.5,
      money: 600,
      street: "普通部通り",
    },
    {
      name: "吉野家　日吉駅前店",
      genre: "牛丼",
      partySizeMin: 1,
      partySizeMax: 4,
      seatingCapacity: 15,
      googleRating: 3.3,
      money: 800,
      street: "普通部通り",
    },
    {
      name: "中国名菜 龍華",
      genre: "中華料理",
      partySizeMin: 4,
      partySizeMax: 10,
      seatingCapacity: 20,
      googleRating: 3.7,
      money: 1300,
      street: "普通部通り",
    },
    {
      name: " 大輝屋 日吉店",
      genre: "ラーメン",
      partySizeMin: 1,
      partySizeMax: 4,
      seatingCapacity: 10,
      googleRating: 4.1,
      money: 900,
      street: "浜銀通り",
    },
    {
      name: " ラーメン どん",
      genre: "ラーメン",
      partySizeMin: 1,
      partySizeMax: 4,
      seatingCapacity: 8,
      googleRating: 4.0,
      money: 900,
      street: "サンロード",
    },
    {
      name: " ラーメン 柴田商店 Ver.2.0",
      genre: "ラーメン",
      partySizeMin: 1,
      partySizeMax: 4,
      seatingCapacity: 8,
      googleRating: 3.7,
      money: 800,
      street: "サンロード",
    },
    {
      name: "江戸前回転寿司ぎょしん 日吉店",
      genre: "海鮮・寿司",
      partySizeMin: 1,
      partySizeMax: 4,
      seatingCapacity: 15,
      googleRating: 4.1,
      money: 900,
      street: "浜銀通り",
    },
    {
      name: "GB's CAFE 日吉駅前店",
      genre: "アメリカン",
      partySizeMin: 5,
      partySizeMax: 15,
      seatingCapacity: 40,
      googleRating: 3.9,
      money: 1500,
      street: "浜銀通り",
    },
    {
      name: "ベンダーキッチン 日吉店",
      genre: "アメリカン",
      partySizeMin: 1,
      partySizeMax: 7,
      seatingCapacity: 7,
      googleRating: 4.2,
      money: 800,
      street: "日吉中央通り",
    },
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
