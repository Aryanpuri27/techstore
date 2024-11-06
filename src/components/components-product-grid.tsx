"use client";

import { ProductCardComponent } from "./components-product-card";

// This would typically come from an API or database
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "/stage.jpeg",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 599.99,
    image: "/stage.jpeg",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 79.99,
    image: "/stage.jpeg",
    category: "Clothing",
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: 49.99,
    image: "/stage.jpeg",
    category: "Home",
  },
  {
    id: 5,
    name: "Bestselling Novel",
    price: 14.99,
    image: "/stage.jpeg",
    category: "Books",
  },
  {
    id: 6,
    name: "Fitness Tracker",
    price: 89.99,
    image: "/stage.jpeg",
    category: "Electronics",
  },
];

export function ProductGridComponent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCardComponent
          key={product.id}
          id={product.id}
          name={product.name}
          price={typeof product.price === "number" ? product.price : null}
          image={product.image}
          category={product.category}
        />
      ))}
    </div>
  );
}
