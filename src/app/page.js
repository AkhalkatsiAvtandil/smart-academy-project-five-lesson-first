"use client";

import { useEffect, useState } from "react";
import Productitem from "@/components/product/Productitem";
import { useDeletedItems } from "./deletedItemsContext";
import styles from "./page.module.css";

export default function Product() {
  const { addDeletedProduct } = useDeletedItems();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(() => setError("Something went wrong while loading the items."))
      .finally(() => setLoading(false));
  }, []);

  function deleteProduct(id) {
    const deletedProduct = products.find((item) => item.id === id);
    if (deletedProduct) addDeletedProduct(deletedProduct);

    setProducts((currentProducts) =>
      currentProducts.filter((item) => item.id !== id),
    );
  }

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
