// public/script.js の全コード

document.addEventListener("DOMContentLoaded", () => {
  // HTML要素をIDで取得
  const searchForm = document.getElementById("search-form");
  const genreSelect = document.getElementById("genre-select");
  const partySizeInput = document.getElementById("party-size-input");
  const moneyInput = document.getElementById("money-input");
  const sortBySelect = document.getElementById("sort-by-select");
  const resultsContainer = document.getElementById("results-container");

  // フォームの検索ボタンが押された（submit）ときのイベントを監視
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // ページの再読み込みを防ぐ

    // ★★★ここが重要：すべてのフォームから現在の値を取得する
    const genre = genreSelect.value;
    const partySize = partySizeInput.value;
    const money = moneyInput.value;
    const sortBy = sortBySelect.value;

    try {
      // ★★★ここが重要：取得したすべての値をURLに含める
      const query = new URLSearchParams({
        genre,
        partySize,
        money,
        sortBy,
      }).toString();
      const response = await fetch(`/api/recommend?${query}`);

      if (!response.ok) {
        throw new Error("検索に失敗しました。");
      }

      const shops = await response.json();
      displayResults(shops); // 結果を表示する関数を呼び出す
    } catch (error) {
      console.error(error);
      resultsContainer.innerHTML =
        "<p>エラーが発生しました。もう一度お試しください。</p>";
    }
  });

  // 結果を表示する関数
  function displayResults(shops) {
    resultsContainer.innerHTML = "";

    if (shops.length === 0) {
      resultsContainer.innerHTML =
        "<p>条件に合うお店は見つかりませんでした。</p>";
      return;
    }

    const list = document.createElement("ul");
    shops.forEach((shop) => {
      const listItem = document.createElement("li");

      let streetClass = "",
        bannerClass = "",
        bannerText = "";
      switch (shop.street) {
        case "普通部通り":
          streetClass = "street-futsubu";
          bannerClass = "banner-futsubu";
          bannerText = "普通部通り";
          break;
        case "日吉中央通り":
          streetClass = "street-chuo";
          bannerClass = "banner-chuo";
          bannerText = "日吉中央通り";
          break;
        case "浜銀通り":
          streetClass = "street-hamagin";
          bannerClass = "banner-hamagin";
          bannerText = "浜銀通り";
          break;
        case "サンロード":
          streetClass = "street-sunroad";
          bannerClass = "banner-sunroad";
          bannerText = "サンロード";
          break;
      }
      if (streetClass) {
        listItem.classList.add(streetClass);
      }

      listItem.innerHTML = `
        <strong>${shop.name}</strong>
        <span>ジャンル: ${shop.genre}</span>
        <span>評価: ${shop.googleRating} ★</span>
        <span>平均所要金額: ￥${shop.money.toLocaleString()}</span>
        <span>推奨人数: ${shop.partySizeMin}〜${shop.partySizeMax}人</span>
        <span>貸切時収容人数: ${shop.seatingCapacity}人</span>
      `;

      if (bannerText) {
        const banner = document.createElement("div");
        banner.className = `street-banner ${bannerClass}`;
        banner.textContent = bannerText;
        listItem.appendChild(banner);
      }

      list.appendChild(listItem);
    });
    resultsContainer.appendChild(list);
  }
});
