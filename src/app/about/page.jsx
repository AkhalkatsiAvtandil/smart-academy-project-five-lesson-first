"use client";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  const handleUserLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    router.replace("/login");
  };

  return (
    <div>
      page
      <button onClick={handleUserLogout}> Log Out </button>
    </div>
  );
}
