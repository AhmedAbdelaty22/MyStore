# MyStore

A single-page online store built with Angular 14. You can browse products, add them to a cart, change quantities and check out.

## Features

- **Product list:** browse all products with their image, price and a quantity picker.
- **Product details:** a separate page for each product with its description.
- **Cart**
  - Add a product from the list or from its details page.
  - Choose a quantity from 1 to 10. If the product is already in the cart, its quantity is updated.
  - Remove products from the cart.
  - The total price updates automatically.
  - The cart is saved in the browser's `localStorage`, so it's still there after a page refresh.
- **Checkout form** (template-driven, with validation)
  - Name: at least 9 characters
  - Address: at least 10 characters
  - Card number: 16 digits
- **Order confirmation page** showing the customer's name and the order total.

This is a front-end demo with no back end. The checkout doesn't process payments, and the card number isn't saved or sent anywhere.

## Angular concepts used

- Components with `@Input()` and `@Output()` (`EventEmitter`) to pass data between parent and child components
- A service (`ProductService`) shared through dependency injection
- `HttpClient` to load products from `src/assets/data.json`
- Routing with route parameters (`item-detail/:id`, `success/:name/:price`)
- Template-driven forms with `ngModel` and validation

## Project structure

| Folder | What's inside |
|---|---|
| `src/app/components/product-list` | The product list page |
| `src/app/components/product-item` | One product card in the list |
| `src/app/components/product-item-details` | The product details page |
| `src/app/components/cart` | The cart page and total price |
| `src/app/components/info` | The checkout form |
| `src/app/components/confirmation` | The order confirmation page |
| `src/app/layout/header` | The header and navigation |
| `src/app/services/product` | Loads products and manages the cart |
| `src/assets/data.json` | The product data |

## Tech stack

- Angular 14, TypeScript, RxJS
- Bootstrap 5, ng-bootstrap, Angular Flex Layout

## How to run

You need [Node.js](https://nodejs.org/).

```bash
npm install
npx ng serve
```

Then open `http://localhost:4200`. Keep the default port 4200, because the product data is loaded from `http://localhost:4200/assets/data.json`.
