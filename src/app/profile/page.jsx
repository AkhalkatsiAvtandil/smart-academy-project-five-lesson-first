import styles from "./page.module.css";
export default async function ProfilePage() {
  const response = await fetch("https://fakestoreapi.com/users/3");
  const user = await response.json();

  return (
    <main className={styles.profile}>
      <h1 className={styles.title}>Profile</h1>
      <p className={styles.detail}>
        Name: {user.name.firstname} {user.name.lastname}
      </p>
      <p className={styles.detail}>Username: {user.username}</p>
      <p className={styles.detail}>Email: {user.email}</p>
    </main>
  );
}
