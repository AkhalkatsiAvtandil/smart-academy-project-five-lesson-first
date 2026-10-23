"use client";
import Link from "next/link";
import styles from "./page.module.css";

const page = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Register Page</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <label className={styles.label} htmlFor="first   Name">
            First Name:
          </label>
          <input className={styles.input} type="text" />

          <label className={styles.label} htmlFor="lastName">
            Last Name:
          </label>
          <input className={styles.input} type="text" />

          <label className={styles.label} htmlFor="age">
            Age:
          </label>
          <input className={styles.input} type="number" />

          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input className={styles.input} type="email" />

          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input className={styles.input} type="password" />

          <label className={styles.label} htmlFor="phone">
            Phone:
          </label>
          <input className={styles.input} type="tel" />
        </div>
        <button className={styles.submitButton} type="submit">
          Register
        </button>
      </form>
      <Link href="/login" className={styles.loginLink}>
        Already have an account? Sign In
      </Link>
    </div>
  );
};

export default page;
