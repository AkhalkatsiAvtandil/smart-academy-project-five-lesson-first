"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const inputRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("m38rmF$");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setUsernameError(null);
    setPasswordError(null);
    if (username.length === 0) {
      return setUsernameError("Username is required.");
    }
    if (password.length === 0) {
      return setPasswordError("Password is required.");
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (response.ok && typeof result.token === "string") {
        sessionStorage.setItem("token", result.token);
        window.dispatchEvent(new Event("auth-change"));
        router.replace("/home");
      } else {
        setSubmitError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      setSubmitError("Unable to sign in right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeePassword = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.title}>Sign In</h3>
        <p className={styles.description}>
          Sign in to access the store. Demo credentials are prefilled.
        </p>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          autoComplete="username"
          value={username}
          ref={inputRef}
          onChange={(event) => setUsername(event.target.value)}
        />
        {usernameError && <p className={styles.error}>{usernameError}</p>}
        <input
          className={styles.input}
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          autoComplete="current-password"
          value={password}
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
        {submitError && (
          <p className={styles.error} role="alert">
            {submitError}
          </p>
        )}
        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <Link href="/register" className={styles.registerLink}>
        Don&apos;t have an account? Sign Up
      </Link>
    </div>
  );
};
export default Page;
