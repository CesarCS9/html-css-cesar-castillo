// ====================================
// DOM ELEMENTS
// ====================================

const productsContainer = document.getElementById("products-container");
const loader = document.getElementById("loader");
const errorContainer = document.getElementById("error");
const homeProducts = document.getElementById("home-products");

const productImage = document.getElementById("product-image");
const productTitle = document.getElementById("product-title");
const productDescription = document.getElementById("product-description");
const productPrice = document.getElementById("product-price");
const productGender = document.getElementById("product-gender");

// ====================================
// API
// ====================================

const API_URL = "https://v2.api.noroff.dev/rainy-days";

// ====================================
// URL PARAMETERS
// ====================================

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

console.log(productId);

// ====================================
// FETCH FUNCTIONS
// ====================================

async function fetchAndCreateProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

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

      card.href = `./product-details.html?id=${product.id}`;

      content.className = "product-info";
      title.className = "card-title";
      price.className = "product-price";
      button.className = "add-to-cart";

      image.src = product.image.url;
      image.alt = product.image.alt;
      title.textContent = product.title;
      price.textContent = `${product.price} kr`;
      button.textContent = "+ Add";

      button.addEventListener('click', (event) => {
        event.preventDefault();
        addToCart(product);
      });

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

async function fetchSingleProduct() {
  try {
    const response = await fetch(`${API_URL}/${productId}`);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    const product = data.data;

    productImage.src = product.image.url;
    productImage.alt = product.image.alt;

    productTitle.textContent = product.title;
    productDescription.textContent = product.description;
    productPrice.textContent = `${product.price} Kr`;
    productGender.textContent = `${product.gender}`;

    console.log(product);
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
}

// ====================================
// RENDER FUNCTIONS
// ====================================

function renderHomeProducts(products) {
  homeProducts.innerHTML = "";

  products.forEach((product) => {
    homeProducts.innerHTML += `
    <a href="./product-details.html?id=${product.id}">
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

// ====================================
// CART FUNCTIONS
// ====================================

function getCart(){
  const cart = localStorage.getItem('cart');

  if(cart){
    return JSON.parse(cart);
  }
  return [];
}

function saveCart(cart){
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product){
  const cart = getCart();

  cart.push(product);

  saveCart(cart);

  console.log(cart);
}

// ====================================
// INIT
// ====================================

fetchAndCreateProducts();

if (productId) {
  fetchSingleProduct();
}
