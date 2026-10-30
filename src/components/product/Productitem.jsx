"use client";
import { useRouter } from "next/navigation";
import styles from "./Productitem.module.css";

export default function Productitem({
  item,
  onDelete,
  onCart,
  onQuantityChange,
}) {
  const router = useRouter();
  const rating =
    typeof item?.rating === "object" ? item.rating.rate : item?.rating;
  const ratingValue = Math.max(0, Math.min(5, Number(rating) || 0));

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
        <p className={styles.rating}>
          <span className={styles.ratingStars} aria-label={`${ratingValue} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index}>{index < Math.round(ratingValue) ? "★" : "☆"}</span>
            ))}
          </span>
          {typeof item?.rating === "object" && item.rating.count
            ? `${item.rating.count} reviews`
            : `${ratingValue} / 5`}
        </p>
        <p>
          {item.description ||
            item.warrantyInformation ||
            "No description available."}
        </p>
        {onQuantityChange && (
          <div className={styles.quantityControls}>
            <button
              onClick={(event) => {
                event.stopPropagation();
                onQuantityChange(item.id, item.quantity - 1);
              }}
              disabled={item.quantity <= 1}
              type="button"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className={styles.quantityValue}>{item.quantity}</span>
            <button
              onClick={(event) => {
                event.stopPropagation();
                onQuantityChange(item.id, item.quantity + 1);
              }}
              disabled={item.quantity >= 10}
              type="button"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}
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
