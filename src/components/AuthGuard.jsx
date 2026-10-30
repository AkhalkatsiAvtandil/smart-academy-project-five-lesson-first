"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";

const subscribeToAuth = (callback) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getAuthSnapshot = () => Boolean(sessionStorage.getItem("token"));
const getServerAuthSnapshot = () => false;

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useSyncExternalStore(
    subscribeToAuth,
    getAuthSnapshot,
    getServerAuthSnapshot,
  );
  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (!isAuthPage && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthPage, isAuthenticated, router]);

  if (isAuthPage || isAuthenticated) {
    return children;
  }

  return null;
}
