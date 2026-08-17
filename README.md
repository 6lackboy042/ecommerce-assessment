# Ecommerce Assessment

This is a responsive ecommerce frontend built for the Learnable front-end standardisation assessment. The application recreates the provided Bandage/Figma ecommerce design and integrates product and cart functionality with the DummyJSON API.

## Live Demo

Netlify: https://ecommerce-assessmentt.netlify.app/

## Tech Stack

- React
- Vite
- TypeScript
- Vanilla CSS
- Redux Toolkit
- Redux Toolkit Query

## Features

- Figma-inspired ecommerce landing page
- Responsive desktop and mobile layouts
- Product listing from DummyJSON
- Product search using the DummyJSON search endpoint
- Product category list and category filtering
- Single product detail page
- Add-to-cart functionality
- Quantity increment and decrement
- Remove item from cart
- Empty cart state
- Cart total and subtotal calculations
- Loading and error states for API-driven sections

## Project Structure

```text
src/
  app/
    hooks.ts
    store.ts
  features/
    cart/
      cartSlice.ts
    carts/
      cartsApi.ts
    products/
      productsApi.ts
  types/
    cart.ts
    product.ts
  App.tsx
  App.css
  main.tsx
assets/
  brands/
  icons/
```

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/6lackboy042/ecommerce-assessment.git
cd ecommerce-assessment
npm install
```

## Running Locally

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal. It is usually:

```text
http://127.0.0.1:5173/
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

The app can be deployed to Netlify using the following settings:

- Build command: `npm run build`
- Publish directory: `dist`

## API Integration

The project uses DummyJSON endpoints through Redux Toolkit Query:

- `GET /products`
- `GET /products/:id`
- `GET /products/search?q=...`
- `GET /products/category-list`
- `GET /products/category/:category`
- `GET /carts`
- `GET /carts/:id`
- `GET /carts/user/:id`
- `DELETE /carts/:id`

## State Management

Redux Toolkit is used for local cart state. The cart slice manages adding items, removing items, decreasing quantities, and calculating cart state in the UI.

Redux Toolkit Query is used for API data fetching, caching, loading states, and error handling. Product, category, search, and cart API logic are separated into feature-specific API files.

## Assumptions and Implementation Notes

- DummyJSON is a fake REST API, so cart deletion is simulated and does not permanently modify server data.
- The visible shopping cart is controlled by local Redux state so that removing all items correctly shows an empty cart.
- Product text, prices, categories, ratings, stock, and images are taken from the API.
- Static images and icons from the Figma assets are used for layout sections such as the hero categories, blog cards, testimonials, CTA, partner logos, and service icons.
- The UI was styled with vanilla CSS only, with responsive media queries for mobile layouts.
- Most UI sections are currently composed in `App.tsx`; with more time, the app could be refactored into smaller component files for improved maintainability.
