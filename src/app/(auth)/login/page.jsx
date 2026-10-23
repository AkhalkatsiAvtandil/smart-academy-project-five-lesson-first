"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [submiterror, setSubmitEror] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("m38rmF$");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError(null);
    setPasswordError(null);
    if (username.length === 0) {
      return setUsernameError("username must be more than 0 characters");
    }
    if (password.length === 0) {
      return setPasswordError("password must be more than 0 characters");
    }

    try {
      const response = await fetch("https://fakestoreapi.com/aut  h/login ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (result.token) {
        throw new Error(router.push("/market"));
      } else {
        return alert("Invalid username or password. Please try again.");
      }
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      return alert("An error occurred while signing in. Please try again.");
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
      <Link href="/register" className={styles.registerLink}>
        Don't have an account?
        <span>Sign Up</span>
      </Link>
    </div>
  );
};

export default Page;
