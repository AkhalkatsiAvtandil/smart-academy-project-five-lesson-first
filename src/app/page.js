"use client";

import { useEffect, useState } from "react";
import Productitem from "@/components/product/Productitem";
import styles from "./page.module.css";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function deleteProduct(id) {
    const product = products.find((item) => item.id === id);
    const deletedProducts = JSON.parse(
      localStorage.getItem("deletedProducts") || "[]",
    );

    localStorage.setItem(
      "deletedProducts",
      JSON.stringify([...deletedProducts, product]),
    );
    setProducts((currentProducts) =>
      currentProducts.filter((item) => item.id !== id),
    );
  }

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        return response.json();
      })
      .then((result) => {
        const deletedProducts = JSON.parse(
          localStorage.getItem("deletedProducts") || "[]",
        );
        const deletedIds = deletedProducts.map((item) => item.id);
        setProducts(
          result.products.filter((item) => !deletedIds.includes(item.id)),
        );
      })
      .catch(() => setError("Something went wrong while loading the items."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={styles.page}>
      <p className={styles.pageTitle}>Fetched items</p>

      {loading && <div className={styles.message}>Loading...</div>}
      {!loading && error && <div className={styles.message}>{error}</div>}

      {!loading && !error && products.length === 0 && (
        <div className={styles.message}>No items to show.</div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className={styles.grid}>
          {products.map((item) => (
            <Productitem key={item.id} item={item} onDelete={deleteProduct} />
          ))}
        </div>
      )}
    </main>
  );
}
