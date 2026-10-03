"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Productitem from "@/components/product/Productitem";
import { useState, useEffect } from "react";

export default function Product() {
  const [products, setProduct] = useState(null);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products ")
      .then((response) => response.json())
      .then((result) => setProduct(result));
  }, [products]);

  if (products === null) {
    return <div className={styles.productitem}>product loading...</div>;
  }

  return (
    <div className={styles.productitem}>
      {products?.map((item) => (
        <div>{item.title}</div>
      ))}
    </div>
  );
}
