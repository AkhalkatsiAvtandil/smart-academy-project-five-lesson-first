# Smart Academy Store

A simple online store built with Next.js. Browse products, view their details, and manage a shopping cart.

## Features

- Sign in and registration pages
- Product catalog and individual product details
- Shopping cart with quantity controls
- Deleted-items page
- Profile, About, and Contact pages
- Product and login data from [Fake Store API](https://fakestoreapi.com/)

## Requirements

- Node.js
- npm

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app uses Fake Store API, so an internet connection is needed for product data and sign-in.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production server after building |
| `npm run lint` | Check the project with ESLint |

## Tech stack

- Next.js App Router
- React
- Redux Toolkit for cart state
- Fake Store API for product and authentication data
