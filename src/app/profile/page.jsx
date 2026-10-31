"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        const response = await fetch("https://fakestoreapi.com/users/3", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Profile request failed with status ${response.status}`);
        }

        if (!response.headers.get("content-type")?.includes("application/json")) {
          throw new Error("Profile service returned a non-JSON response");
        }

        const profile = await response.json();
        if (
          !profile?.name?.firstname ||
          !profile?.name?.lastname ||
          !profile?.username ||
          !profile?.email
        ) {
          throw new Error("Profile service returned incomplete user data");
        }

        setUser(profile);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError("Unable to load profile details. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProfile();
    return () => controller.abort();
  }, []);

  return (
    <main className={styles.profile}>
      <h1 className={styles.title}>Profile</h1>
      {loading && <p className={styles.detail}>Loading profile...</p>}
      {error && (
        <p className={styles.detail} role="alert">
          {error}
        </p>
      )}
      {user && (
        <>
          <p className={styles.detail}>
            Name: {user.name.firstname} {user.name.lastname}
          </p>
          <p className={styles.detail}>Username: {user.username}</p>
          <p className={styles.detail}>Email: {user.email}</p>
        </>
      )}
    </main>
  );
}
