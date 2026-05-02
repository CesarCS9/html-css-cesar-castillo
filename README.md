# Rainy Days Store – JavaScript Course Assignment

## Brief

This project is the final delivery for the JavaScript Course Assignment.

The goal of the assignment was to build a fully interactive e-commerce website using Vanilla JavaScript and data fetched dynamically from the Noroff Rainy Days API.

The project expands the original HTML & CSS version of Rainy Days by adding:

* Dynamic product rendering
* Product filtering
* Product detail pages
* Shopping cart functionality
* Checkout flow
* LocalStorage persistence
* Dynamic order confirmation
* API integration using async/await

The application was built using only:

* HTML
* CSS
* Vanilla JavaScript

No frameworks or external JavaScript libraries were used.

---

# Live Site

## Website

[https://cesarcs9.github.io/rainy-days-store-cesar-castillo/index.html](https://cesarcs9.github.io/rainy-days-store-cesar-castillo/index.html)

## GitHub Repository

[https://github.com/cesarcs9/rainy-days-store-cesar-castillo](https://github.com/cesarcs9/rainy-days-store-cesar-castillo)

## Figma Prototype

[https://www.figma.com/proto/SdYSl3CzFm0yc1jdNQyU4c/RainyDays-Prototype?node-id=0-1&t=eWKvicLWjdi5UrZc-1](https://www.figma.com/proto/SdYSl3CzFm0yc1jdNQyU4c/RainyDays-Prototype?node-id=0-1&t=eWKvicLWjdi5UrZc-1)

---

# Features

## Product Pages

* Dynamic product rendering from API
* Single product detail pages
* Related products section
* Product category pages for men and women
* Product sorting by price

## Shopping Cart

* Add products to cart
* Remove products from cart
* Increase product quantity
* Persistent cart using LocalStorage
* Dynamic cart badge

## Checkout Flow

* Cart summary page
* Payment page
* Simulated checkout process
* Order confirmation page with generated order details

## Additional Pages

* Privacy Policy
* Terms of Use

---

# Requirements Covered

* Fetch and display products dynamically from external API
* Dynamic product detail pages
* Shopping cart with LocalStorage persistence
* Add and remove products from cart
* Order summary calculations
* Product filtering and sorting
* Category-specific pages
* Loading states during API requests
* Error handling for failed API requests
* Responsive layout for mobile, tablet and desktop
* Semantic HTML structure
* Accessibility considerations

---

# Technical Decisions

## Single JavaScript File Structure

The project uses one main JavaScript file divided into logical sections:

* DOM Elements
* Fetch Functions
* Render Functions
* Filter Functions
* Cart Functions
* Form Functions
* Init Section

This structure improved readability and made debugging easier during development.

## LocalStorage Cart System

The shopping cart state is stored in LocalStorage to persist products and quantities while navigating between pages.

## Category Pages

Separate category pages were created for:

* Men's Collection
* Women's Collection

These pages reuse the same rendering logic while applying category-specific filters.

## Error Handling

All fetch requests include:

* Response validation
* Try/catch blocks
* User-facing error messages
* Console debugging messages

## Responsive Layout

Flexbox and CSS Grid were used depending on layout needs.

The website was tested across:

* Mobile
* Tablet
* Desktop

using Chrome DevTools.

---

# Accessibility

The project includes several accessibility considerations:

* Semantic HTML
* Alt text for images
* Readable font sizes
* Keyboard accessible forms and buttons
* Sufficient color contrast
* Proper heading hierarchy

---

# Validation & Testing

The project was tested using:

* Chrome DevTools
* W3C HTML Validator
* Manual responsive testing
* Console error testing
* GitHub Pages deployment testing

The final version:

* Has no known console errors
* Avoids horizontal scrolling
* Maintains responsive layouts across devices

---

# Tools & Technologies

* HTML5
* CSS3
* Vanilla JavaScript
* Flexbox
* CSS Grid
* LocalStorage API
* Fetch API
* Google Fonts
* Font Awesome
* GitHub
* GitHub Pages
* Chrome DevTools
* Figma

---

# API

Data is fetched from the Noroff Rainy Days API:

[https://v2.api.noroff.dev/rainy-days](https://v2.api.noroff.dev/rainy-days)

API documentation:

[https://docs.noroff.dev/docs/v2/e-commerce/rainy-days](https://docs.noroff.dev/docs/v2/e-commerce/rainy-days)

---

# AI Usage

Artificial Intelligence tools were used as learning support during development.

AI assistance included:

* Debugging help
* JavaScript explanations
* Project structure guidance
* Documentation writing support
* README formatting support

All code was reviewed, understood and manually integrated into the final project.

A dedicated AI_LOG.md file is included in the repository.



