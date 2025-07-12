// HTMLドキュメントが完全に読み込まれた後に処理を開始する
document.addEventListener("DOMContentLoaded", () => {
  const shopsList = document.getElementById("shops-list");

  // サーバーにリクエストを送り、店舗データを取得して表示する関数
  async function fetchAndDisplayShops() {
    try {
      // ステップ1で作成したAPIを呼び出す
      const response = await fetch("/api/shops");
      if (!response.ok) {
        throw new Error("データの取得に失敗しました。");
      }
      const shops = await response.json();

      // 取得した店舗データでリストを生成する
      shops.forEach((shop) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <strong>${shop.name}</strong>
          <span>ジャンル: ${shop.genre}</span>
          <span>評価: ${shop.googleRating} ★</span>
        `;
        shopsList.appendChild(listItem);
      });
    } catch (error) {
      console.error(error);
      shopsList.textContent = "店舗情報の表示に失敗しました。";
    }
  }

  // 関数を実行
  fetchAndDisplayShops();
});
