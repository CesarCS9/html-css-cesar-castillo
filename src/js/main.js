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
const productButton = document.getElementById("add-to-cart-detail");

const cartContainer = document.getElementById("cart-container");


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

    if (loader) {
      loader.style.display = "none";
    }

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

      button.addEventListener("click", (event) => {
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
    if (loader) {
      loader.style.display = "none";
    }

    if (errorContainer) {
      errorContainer.textContent = "Something went wrong loading products";
    }

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

    productButton.addEventListener('click', () => {
      addToCart(product);
    });

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
                <button class="add-to-cart" data-id="${product.id}">+ Add</button>
        </div>
    </a>
        `;
  });

  const homeButtons = document.querySelectorAll("#home-products .add-to-cart");

  homeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const productId = button.dataset.id;

      const selectedProduct = products.find((product) => product.id === productId);
      
      addToCart(selectedProduct);
    });

  });
}

function renderCart() {
  const cart = getCart();

  cartContainer.innerHTML = "";

  cart.forEach((product) => {
    cartContainer.innerHTML += `
    <div class = "cart-product">

     <div class="cart-product-header">
        <p>${product.title}</p>
        <p>${product.price} Kr</p>
      </div>

      <div class="cart-product-main">
        <img src="${product.image.url}" alt="${product.title}">

        <div class="cart-product-meta">
          <p>${product.gender}</p>
        </div>
      </div>

      <div class="cart-quantity">
        <button type="button" class="remove-item" data-id="${product.id}">
          <i class="fa-solid fa-trash"></i>
        </button>

        <span>${product.quantity}</span>

        <button type="button" class="increase-quantity" data-id="${product.id}">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>

    </div>
    `;
  });

  const increaseButtons = document.querySelectorAll(".increase-quantity");

  increaseButtons.forEach((button) => {
    button.addEventListener('click', () => {

      const productId = button.dataset.id;

      increaseQuantity(productId);
    });
  });

  const decreaseButtons = document.querySelectorAll(".remove-item");

  decreaseButtons.forEach((button) => {
    button.addEventListener('click', () => {

      const productId = button.dataset.id;

      decreaseQuantity(productId);
    });
  });
}

// ====================================
// CART FUNCTIONS
// ====================================

function getCart() {
  const cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(cart);
  }
  return [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      gender: product.gender,
      image: product.image,
      quantity: 1,
    };

    cart.push(cartProduct);
  }

  saveCart(cart);

  console.log(cart);
}

function increaseQuantity(productId){
  const cart = getCart();

  const product = cart.find((item) => item.id === productId);

  product.quantity +=1;

  saveCart(cart);

  renderCart();
}

function decreaseQuantity(productId){
  const cart = getCart();

  const product = cart.find((item) => item.id === productId);

  if (product.quantity > 1) {

    product.quantity -= 1;

  } else {
    const updatedCart = cart.filter((item) => item.id !== productId);

    saveCart(updatedCart);

    renderCart();

    return;
  }

  saveCart(cart);

  renderCart();
}

// ====================================
// INIT
// ====================================

if (productsContainer || homeProducts) {
  fetchAndCreateProducts();
}

if (productId) {
  fetchSingleProduct();
}

if (cartContainer) {
  renderCart();
}
