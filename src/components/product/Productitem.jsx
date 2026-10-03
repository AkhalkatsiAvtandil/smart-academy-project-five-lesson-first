"use client";
import Link from "next/link";
import styles from "./Productitem.module.css";

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
