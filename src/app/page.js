"use client";

import { useEffect, useState } from "react";
import Productitem from "@/components/product/Productitem";
import styles from "./page.module.css";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        return response.json();
      })
      .then((result) => setProducts(result))
      .catch(() => setError("Something went wrong while loading the items."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={styles.page}>
      <p className={styles.pageTitle}>Fetched items</p>

      {loading && <div className={styles.message}>Loading...</div>}
      {!loading && error && <div className={styles.message}>{error}</div>}

      {!loading && !error && (
        <div className={styles.grid}>
          {products.map((item) => (
            <Productitem key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
