"use strict";

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
const orderSummary = document.getElementById("order-summary");

const paymentProducts = document.getElementById("payment-products");
const paymentSummary = document.getElementById("payment-summary");

const checkoutButton = document.querySelector(".checkout-btn");

const paymentForm = document.querySelector("form");

const confirmationOrder = document.getElementById("confirmation-order");
const confirmationTotal = document.getElementById("confirmation-total");
const confirmationPayment = document.getElementById("confirmation-payment");
const confirmationTransaction = document.getElementById(
  "confirmation-transaction",
);

const cartCount = document.getElementById("cart-count");

const genderFilter = document.getElementById("gender-filter");
const priceFilter = document.getElementById("price-filter");

const relatedProducts = document.getElementById("related-products");

// ====================================
// API
// ====================================

const API_URL = "https://v2.api.noroff.dev/rainy-days";

// ====================================
// URL PARAMETERS
// ====================================

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// ====================================
// GLOBAL VARIABLES
// ====================================

let allProducts = [];

// ====================================
// FETCH FUNCTIONS
// ====================================

/**
 * Fetches all products from the API
 * and renders them on the correct page.
 */

async function fetchAndCreateProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    allProducts = data.data;

    //HOME PRODUCTS SECTION
    if (homeProducts) {
      const featured = allProducts.slice(0, 6);
      renderHomeProducts(featured);
    }

    if (loader) {
      loader.style.display = "none";
    }

    if (productsContainer) {
      if (window.location.href.includes("mens-products.html")) {
        applyCategoryFilter("Male");
      } else if (window.location.href.includes("women-products.html")) {
        applyCategoryFilter("Female");
      } else {
        renderProducts(allProducts);
      }
    }
  } catch (error) {
    if (loader) {
      loader.style.display = "none";
    }

    if (errorContainer) {
      errorContainer.textContent = "Something went wrong loading products";
    }

    console.error("Failed to fetch and create products", error);
  }
}

/**
 * Fetches a single product based on the URL id parameter.
 */

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

    productButton.addEventListener("click", () => {
      addToCart(product);
    });
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
}

// ====================================
// RENDER FUNCTIONS
// ====================================

/**
 * Renders all products dynamically into the products container.
 */

function renderProducts(products) {
  productsContainer.innerHTML = "";

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
}

/**
 * Renders featured products
 * on the homepage.
 */

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
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const productId = button.dataset.id;

      const selectedProduct = products.find(
        (product) => product.id === productId,
      );

      addToCart(selectedProduct);
    });
  });
}

/**
 * Renders 3 random related products
 * excluding the current product.
 */

async function renderRelatedProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    const products = data.data;

    const filteredProducts = products.filter(
      (product) => product.id !== productId,
    );

    filteredProducts.sort(() => Math.random() - 0.5);

    const selectedProducts = filteredProducts.slice(0, 3);

    relatedProducts.innerHTML = "";

    selectedProducts.forEach((product) => {
      relatedProducts.innerHTML += `

    <div class="related-card">

      <a href="./product-details.html?id=${product.id}">

        <img 
          loading="lazy"
          src="${product.image.url}" 
          alt="${product.title}"
        >

        <div class="related-info">
          <p>${product.title}</p>
          <p>${product.price} Kr</p>
        </div>

      </a>

    </div>

  `;
    });
  } catch (error) {
    console.error("Failed to render related products", error);
  }
}

/**
 * Renders all cart items dynamically.
 */

function renderCart() {
  const cart = getCart();

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `
  
      <div class="empty-cart">

        <h2>Oops! Your cart is empty.</h2>

        <p>
          Explore our products and find your next adventure jacket.
        </p>

        <a href="./products.html" class="empty-cart-btn">
          Explore Products
        </a>

      </div>
  
    `;
    return;
  }

  cart.forEach((product) => {
    cartContainer.innerHTML += `
    <div class = "cart-product">

     <div class="cart-product-header">
        <p>${product.title}</p>
        <p>${product.price} Kr</p>
      </div>

      <div class="cart-product-main">

        <a href="./product-details.html?id=${product.id}">
          <img src="${product.image.url}" alt="${product.title}">
        </a>

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
    button.addEventListener("click", () => {
      const productId = button.dataset.id;

      increaseQuantity(productId);
    });
  });

  const decreaseButtons = document.querySelectorAll(".remove-item");

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;

      decreaseQuantity(productId);
    });
  });
}

/**
 * Calculates and renders
 * the cart order summary.
 */

function renderOrderSummary() {
  const cart = getCart();

  let totalItems = 0;
  let subtotal = 0;

  cart.forEach((product) => {
    totalItems += product.quantity;

    subtotal += product.price * product.quantity;
  });

  orderSummary.innerHTML = `
    <h2>Order Summary</h2>

    <div class="order-row">
      <p>Subtotal (${totalItems} items)</p>
      <p>${subtotal.toFixed(2)} Kr</p>
    </div>

    <div class="order-row">
      <p>Estimated shipping</p>
      <p>100 Kr</p>
    </div>

    <div class="order-row">
      <p>Free standard shipping</p>
      <p>-100 Kr</p>
    </div>

    <div class="order-row-total order-row">
      <p>Total Order</p>
      <p>${subtotal.toFixed(2)} Kr</p>
    </div>  
  `;
}

/**
 * Renders checkout products
 * on the payment page.
 */

function renderPaymentProducts() {
  const cart = getCart();

  paymentProducts.innerHTML = "";

  cart.forEach((product) => {
    paymentProducts.innerHTML += `

      <div class="cart-product cart-product-2">

        <div class="cart-product-header">
          <p>${product.title}</p>
          <p>${product.price} Kr</p>
        </div>

        <div class="cart-product-main">

          <a href="./product-details.html?id=${product.id}">
            <img src="${product.image.url}" alt="${product.title}">
          </a>

          <div class="cart-product-meta">
            <p>${product.gender}</p>
            <p>Quantity: ${product.quantity}</p>
          </div>

        </div>

      </div>
    `;
  });

  paymentProducts.innerHTML += `

    <div class="edit-cart">
      <a href="./cart.html">Edit cart</a>
    </div>

  `;
}

/**
 * Renders the payment summary
 * with totals and shipping.
 */

function renderPaymentSummary() {
  const cart = getCart();

  let totalItems = 0;
  let subtotal = 0;

  cart.forEach((product) => {
    totalItems += product.quantity;

    subtotal += product.price * product.quantity;
  });

  paymentSummary.innerHTML = `
  
    <h2>Order Summary</h2>

    <div class="order-row">
      <p>Subtotal (${totalItems} items)</p>
      <p>${subtotal.toFixed(2)} Kr</p>
    </div>

    <div class="order-row">
      <p>Estimated shipping</p>
      <p>100 Kr</p>
    </div>

    <div class="order-row">
      <p>Free standard shipping</p>
      <p>-100 Kr</p>
    </div>

    <div class="order-row-total order-row">
      <p>Total Order</p>
      <p>${subtotal.toFixed(2)} Kr</p>
    </div>

  `;
}

/**
 * Displays order information
 * on the confirmation page.
 */

function renderConfirmation() {
  const orderData = JSON.parse(localStorage.getItem("orderData"));

  if (!orderData) return;

  confirmationOrder.textContent = orderData.orderNumber;

  confirmationTotal.textContent = `${orderData.total} Kr`;

  confirmationPayment.textContent = orderData.paymentMethod;

  confirmationTransaction.textContent = orderData.transactionNumber;
}

/**
 * Updates the cart badge
 * with the total quantity.
 */

function renderCartBadge() {
  const cart = getCart();

  let totalItems = 0;

  cart.forEach((product) => {
    totalItems += product.quantity;
  });

  if (totalItems === 0) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "flex";

    cartCount.textContent = totalItems;
  }
}

// ====================================
// FILTER FUNCTIONS
// ====================================

/**
 * Filters products by gender
 * and sorts them by price.
 */

function applyFilters() {
  let filteredProducts = [...allProducts];

  const selectedGender = genderFilter.value;
  const selectedPrice = priceFilter.value;

  //FILTER BY GENDER

  if (selectedGender !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.gender === selectedGender,
    );
  }

  //SORT BY PRICE

  if (selectedPrice === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedPrice === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts(filteredProducts);
}

/**
 * Filters products
 * by a specific category gender.
 */

function applyCategoryFilter(gender) {
  let filteredProducts = allProducts.filter(
    (product) => product.gender === gender,
  );

  const selectedPrice = priceFilter.value;

  if (selectedPrice === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedPrice === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  renderProducts(filteredProducts);
}

// ====================================
// CART FUNCTIONS
// ====================================

/**
 * Gets cart data from localStorage.
 */

function getCart() {
  const cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(cart);
  }
  return [];
}

/**
 * Saves updated cart data
 * to localStorage.
 */

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Adds a product to the cart
 * or increases its quantity.
 */

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

  renderCartBadge();
}

/**
 * Increases product quantity in the cart.
 */

function increaseQuantity(productId) {
  const cart = getCart();

  const product = cart.find((item) => item.id === productId);

  product.quantity += 1;

  saveCart(cart);

  renderCart();

  renderOrderSummary();

  renderCartBadge();
}

/**
 * Decreases product quantity
 * or removes it from the cart.
 */

function decreaseQuantity(productId) {
  const cart = getCart();

  const product = cart.find((item) => item.id === productId);

  if (product.quantity > 1) {
    product.quantity -= 1;
  } else {
    const updatedCart = cart.filter((item) => item.id !== productId);

    saveCart(updatedCart);

    renderCart();

    renderOrderSummary();

    return;
  }

  saveCart(cart);

  renderCart();

  renderOrderSummary();

  renderCartBadge();
}

// ====================================
// FORM FUNCTIONS
// ====================================

/**
 * Validates the payment form
 * and creates a simulated order.
 */

function handlePaymentSubmit(event) {
  event.preventDefault();

  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  const email = document.getElementById("email").value.trim();
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const cardNumber = document.getElementById("card-number").value.trim();

  if (!email || !name || !address || !cardNumber) {
    alert("Please fill in all required fields");

    return;
  }

  let total = 0;

  cart.forEach((product) => {
    total += product.price * product.quantity;
  });

  const orderData = {
    orderNumber: Math.floor(Math.random() * 100000),
    total: total.toFixed(2),
    paymentMethod: "Visa XXXX",
    transactionNumber: Math.floor(Math.random() * 100000000),
  };

  localStorage.setItem("orderData", JSON.stringify(orderData));

  localStorage.removeItem("cart");

  renderCartBadge();

  window.location.href = "./confirmation.html";
}

// ====================================
// INIT
// ====================================

/**
 * Initialize application features
 * depending on the current page.
 */

if (productsContainer || homeProducts) {
  fetchAndCreateProducts();
}

if (productId) {
  fetchSingleProduct();
}

if (cartContainer) {
  renderCart();

  renderOrderSummary();
}

if (checkoutButton) {
  checkoutButton.addEventListener("click", (event) => {
    const cart = getCart();

    if (cart.length === 0) {
      event.preventDefault();

      alert("Please add items to your cart before checkout.");
    }
  });
}

if (paymentProducts) {
  renderPaymentProducts();
}

if (paymentSummary) {
  renderPaymentSummary();
}

if (paymentForm) {
  paymentForm.addEventListener("submit", handlePaymentSubmit);
}

if (confirmationOrder) {
  renderConfirmation();
}

if (genderFilter) {
  genderFilter.addEventListener("change", applyFilters);
}

if (priceFilter) {
  priceFilter.addEventListener("change", () => {
    if (window.location.href.includes("mens-products.html")) {
      applyCategoryFilter("Male");
    } else if (window.location.href.includes("women-products.html")) {
      applyCategoryFilter("Female");
    } else {
      applyFilters();
    }
  });
}

if (cartCount) {
  renderCartBadge();
}

if (relatedProducts) {
  renderRelatedProducts();
}
