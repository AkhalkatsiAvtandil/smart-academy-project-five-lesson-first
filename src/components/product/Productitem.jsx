import styles from "./Productitem.module.css";

export default function Productitem({ item }) {
  const initials = item.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className={styles.card}>
      <div className={styles.avatar}>{initials}</div>

      <div className={styles.content}>
        <h3>{item.name}</h3>
        <p className={styles.role}>{item.company?.name || "Company"}</p>
        <p>{item.email}</p>
        <p>{item.phone}</p>
        <a href={`https://${item.website}`} target="_blank" rel="noreferrer">
          {item.website}
        </a>
      </div>
    </article>
  );
}
