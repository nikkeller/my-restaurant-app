document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const genreSelect = document.getElementById("genre-select");
  const partySizeInput = document.getElementById("party-size-input");
  const sortBySelect = document.getElementById("sort-by-select");
  const resultsContainer = document.getElementById("results-container");

  // フォームが送信されたときの処理
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // フォームのデフォルトの送信動作をキャンセル

    const genre = genreSelect.value;
    const partySize = partySizeInput.value;
    const sortBy = sortBySelect.value; // ★★★追加★★★

    // APIを呼び出して結果を取得
    try {
      // クエリパラメータを付けてAPIのURLを構築
      const query = new URLSearchParams({ genre, partySize }).toString();
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
    resultsContainer.innerHTML = ""; // 前回の結果をクリア

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
