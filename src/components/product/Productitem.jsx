"use client";
import { useRouter } from "next/navigation";
import styles from "./Productitem.module.css";

export default function Productitem({ item, onDelete }) {
  const router = useRouter();

  return (
    <article
      className={styles.card}
      onClick={() => router.push(`/productDdetails/${item.id}`)}
    >
      <img className={styles.image} src={item.images[0]} alt={item.title} />

      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
        <p>${item.price}</p>
        <p>{item.rating}</p>
        <p>{item.warrantyInformation}</p>
        {onDelete && (
          <button
            className={styles.deleteButton}
            onClick={(event) => {
              event.stopPropagation();
              onDelete(item.id);
            }}
            type="button"
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
