"use client";

import { useEffect, useState } from "react";
import Productitem from "@/components/product/Productitem";
import styles from "../page.module.css";

export default function DeletedItemsPage() {
  const [deletedProducts, setDeletedProducts] = useState(null);

  useEffect(() => {
    setDeletedProducts(
      JSON.parse(localStorage.getItem("deletedProducts") || "[]"),
    );
  }, []);

  return (
    <main className={styles.page}>
      <p className={styles.pageTitle}>Deleted Items</p>

      {deletedProducts === null ? (
        <div className={styles.message}>Loading...</div>
      ) : deletedProducts.length === 0 ? (
        <div className={styles.message}>No deleted items.</div>
      ) : (
        <div className={styles.grid}>
          {deletedProducts.map((item) => (
            <Productitem key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
