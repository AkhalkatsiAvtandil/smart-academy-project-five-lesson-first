"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";

const subscribeToAuth = (callback) => {
  window.addEventListener("storage", callback);
  window.addEventListener("auth-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("auth-change", callback);
  };
};

const getAuthSnapshot = () => Boolean(sessionStorage.getItem("token"));
const subscribeToMount = () => () => {};
const getClientMountSnapshot = () => true;
const getServerMountSnapshot = () => false;

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isMounted = useSyncExternalStore(
    subscribeToMount,
    getClientMountSnapshot,
    getServerMountSnapshot,
  );
  const isAuthenticated = useSyncExternalStore(
    subscribeToAuth,
    getAuthSnapshot,
    getServerMountSnapshot,
  );
  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (isMounted && !isAuthPage && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthPage, isAuthenticated, isMounted, router]);

  if (isAuthPage || (isMounted && isAuthenticated)) {
    return children;
  }

  return null;
}
