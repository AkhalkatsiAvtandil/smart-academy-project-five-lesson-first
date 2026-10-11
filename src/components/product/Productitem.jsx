"use client";
import { useRouter } from "next/navigation";
import styles from "./Productitem.module.css";

export default function Productitem({ item, onDelete, onCart }) {
  const router = useRouter();
  const rating =
    typeof item?.rating === "object" ? item.rating.rate : item?.rating;

  return (
    <article
      className={styles.card}
      onClick={() => router.push(`/productDdetails/${item.id}`)}
    >
      <img
        className={styles.image}
        src={item.image || "https://via.placeholder.com/300x300?text=Product"}
        alt={item.title}
      />

      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
        <p>${item.price}</p>
        <p>Rating: {rating ?? "No rating"} / 5</p>
        <p>
          {item.description ||
            item.warrantyInformation ||
            "No description available."}
        </p>
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
        {onCart && (
          <button
            className={styles.addToCartButton}
            onClick={(event) => {
              event.stopPropagation();
              onCart(item);
            }}
            type="button"
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}
