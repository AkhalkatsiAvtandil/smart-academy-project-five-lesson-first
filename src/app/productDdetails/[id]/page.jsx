"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/slices/cartSlice";
import { useDeletedItems } from "../../deletedItemsContext";

import styles from "./page.module.css";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addDeletedProduct } = useDeletedItems();
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
    return <main className={styles.state}>Loading product...</main>;
  }

  if (error) {
    return <main className={styles.state}>{error}</main>;
  }

  if (!product) {
    return <main className={styles.state}>No product found.</main>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const handleDelete = () => {
    addDeletedProduct(product);
    router.push("/deletedItems");
  };
  const rating = Math.max(
    0,
    Math.min(5, Math.round(Number(product.rating?.rate) || 0)),
  );

  return (
    <main className={styles.page}>
      <section className={styles.product}>
        <div className={styles.imagePanel}>
          <img src={product.image} alt={product.title} />
        </div>
        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h1>{product.title}</h1>
          <p className={styles.rating}>
            <span aria-label={`${rating} out of 5 stars`}>
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </span>
            {product.rating?.rate ?? "No rating"} / 5
          </p>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.actions}>
            <button
              className={styles.addButton}
              type="button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className={styles.deleteButton}
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
