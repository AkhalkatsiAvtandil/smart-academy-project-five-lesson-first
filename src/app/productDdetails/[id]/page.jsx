"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/slices/cartSlice";

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })
      .then((result) => setProduct(result))
      .catch(() => setError("Something went wrong while loading the product."))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 24px" }}>
      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        style={{
          maxWidth: 300,
          width: "100%",
          display: "block",
          margin: "24px 0",
        }}
      />
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating?.rate ?? "No rating"} / 5</p>
      <p>{product.description}</p>
      <button type="button" onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
    </main>
  );
}
