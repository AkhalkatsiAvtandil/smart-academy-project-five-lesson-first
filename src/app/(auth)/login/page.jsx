"use client";
import { useState } from "react";
import styles from "./page.module.css";
const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [submiterror, setSubmitEror] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError(null);
    setPasswordError(null);
    if (username.length === 0) {
      return setUsernameError("username must be more than 0 characters");
    }
    if (password.length === 0) {
      return setPasswordError("password must be more than 0 characters");
    }
  };
  const handleSeePassword = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.title}>Sign In</h3>
        <p className={styles.description}>Sign in to access market.</p>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        {usernameError && <p className={styles.error}>{usernameError}</p>}
        <input
          className={styles.input}
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        {passwordError && <p className={styles.error}>{passwordError}</p>}
        <button
          className={styles.passwordToggle}
          type="button"
          onClick={handleSeePassword}
        >
          {isVisible ? "hide password" : "see password"}
        </button>
        <button className={styles.submitButton} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Page;
