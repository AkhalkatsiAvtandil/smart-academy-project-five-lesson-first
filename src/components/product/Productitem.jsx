import styles from "./Productitem.module.css";

export default function Productitem({ item, onDelete }) {
  return (
    <article className={styles.card}>
      <img className={styles.image} src={item.images[0]} alt={item.title} />

      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
        <p>${item.price}</p>
        <p>{item.rating}</p>
        <p>{item.warrantyInformation}</p>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(item.id)}
          type="button"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
