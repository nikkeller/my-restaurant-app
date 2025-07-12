document.addEventListener("DOMContentLoaded", () => {
  // 1. 必要なHTML要素をすべて取得する
  const searchForm = document.getElementById("search-form");
  const genreSelect = document.getElementById("genre-select");
  const partySizeInput = document.getElementById("party-size-input");
  const sortBySelect = document.getElementById("sort-by-select"); // ★ この行が重要
  const resultsContainer = document.getElementById("results-container");

  // 2. フォームの検索ボタンが押されたときの処理
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // ページの再読み込みを防ぐ

    // 3. フォームから現在の値を取得する
    const genre = genreSelect.value;
    const partySize = partySizeInput.value;
    const sortBy = sortBySelect.value; // ★ この行で並び替えの値を取得

    try {
      // 4. 取得したすべての値をURLの末尾（クエリパラメータ）に含める
      const query = new URLSearchParams({
        genre,
        partySize,
        sortBy,
      }).toString(); // ★ ここにsortByを含めるのが重要
      const response = await fetch(`/api/recommend?${query}`);

      if (!response.ok) {
        throw new Error("検索に失敗しました。");
      }

      const shops = await response.json();
      displayResults(shops); // 結果表示の関数を呼び出す
    } catch (error) {
      console.error(error);
      resultsContainer.innerHTML =
        "<p>エラーが発生しました。もう一度お試しください。</p>";
    }
  });

  // 5. 結果を表示する関数（この部分は変更なし）
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
      listItem.innerHTML = `
        <strong>${shop.name}</strong>
        <span>ジャンル: ${shop.genre}</span>
        <span>対応人数: ${shop.partySizeMin}〜${shop.partySizeMax}人</span>
        <span>評価: ${shop.googleRating} ★</span>
      `;
      list.appendChild(listItem);
    });
    resultsContainer.appendChild(list);
  }
});
