const productsContainer = document.getElementById("products-container");
const API_URL = "https://v2.api.noroff.dev/rainy-days";
const loader = document.getElementById("loader");
const errorContainer = document.getElementById("error");
const homeProducts = document.getElementById("home-products");

async function fetchAndCreateProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const products = data.data;

    //HOME PRODUCTS SECTION
    if (homeProducts) {
      const featured = products.slice(0, 6);
      renderHomeProducts(featured);
    }

    loader.style.display = "none";

    products.forEach((product) => {
      const card = document.createElement("a");
      const image = document.createElement("img");
      const content = document.createElement("div");
      const title = document.createElement("p");
      const price = document.createElement("p");
      const button = document.createElement("button");

      card.href = `../product/index.html?id=${product.id}`;

      content.className = "product-info";
      title.className = "card-title";
      price.className = "product-price";
      button.className = "add-to-cart";

      image.src = product.image.url;
      image.alt = product.image.alt;
      title.textContent = product.title;
      price.textContent = `${product.price} kr`;
      button.textContent = "+ Add";

      content.appendChild(title);
      content.appendChild(price);
      content.appendChild(button);
      card.appendChild(image);
      card.appendChild(content);

      productsContainer.appendChild(card);
    });
  } catch (error) {
    loader.style.display = "none";
    errorContainer.textContent = "Something went wrong loading products";
    console.error("Failed to fetch and create products", error.status);
  }
}

fetchAndCreateProducts();

function renderHomeProducts(products) {
  homeProducts.innerHTML = "";

  products.forEach((product) => {
    homeProducts.innerHTML += `
    <a href="./product/index.html?id=${product.id}">
        <img src="${product.image.url}" alt="${product.title}">
        <div class="product-info home-layout">  
                <div class="text-block">
                    <span>${product.title}</span>
                    <span class="product-price">${product.price} Kr</span>
                </div>
                <button class="add-to-cart">+ Add</button>
        </div>
    </a>
        `;
  });
}
