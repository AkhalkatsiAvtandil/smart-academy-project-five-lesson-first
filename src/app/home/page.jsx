"use client";

import { useEffect, useState } from "react";
import Productitem from "@/components/product/Productitem";
import { useDeletedItems } from "../deletedItemsContext";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/slices/cartSlice";
import styles from "../page.module.css";

export default function HomePage() {
  const dispatch = useAppDispatch();
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

  if (loading) return null;

  return (
    <main className={styles.page}>
      <p className={styles.pageTitle}>Fetched items</p>

      {error && <div className={styles.message}>{error}</div>}

      {!error && products.length === 0 && (
        <div className={styles.message}>No items to show.</div>
      )}

      {!error && products.length > 0 && (
        <div className={styles.grid}>
          {products.map((item) => (
            <Productitem
              key={item.id}
              item={item}
              onDelete={deleteProduct}
              onCart={(product) => dispatch(addToCart(product))}
            />
          ))}
        </div>
      )}
    </main>
  );
}
