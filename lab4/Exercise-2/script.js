const searchBox = document.getElementById("searchBox");
const resultsDiv = document.getElementById("results");
const statusMsg = document.getElementById("statusMsg");

let debounceTimer;

async function fetchProducts(query) {
  try {
    statusMsg.textContent = "";
    resultsDiv.innerHTML = "<p>Loading...</p>";

    const res = await fetch("products.json");

    if (!res.ok) {
      throw new Error("Failed request");
    }

    const data = await res.json();

    const filtered = data.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    resultsDiv.innerHTML = "";

    if (filtered.length === 0) {
      statusMsg.textContent = "No results found ❌";
      return;
    }

    filtered.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${product.name}</h3>
        <p><b>Price:</b> ₹${product.price}</p>
        <p><b>Category:</b> ${product.category}</p>
      `;

      resultsDiv.appendChild(card);
    });

  } catch (err) {
    resultsDiv.innerHTML = "";
    statusMsg.textContent = "⚠️ Error fetching products!";
  }
}

searchBox.addEventListener("input", () => {
  clearTimeout(debounceTimer);

  const query = searchBox.value.trim();

  debounceTimer = setTimeout(() => {
    if (query === "") {
      resultsDiv.innerHTML = "";
      statusMsg.textContent = "";
      return;
    }
    fetchProducts(query);
  }, 500);
});
