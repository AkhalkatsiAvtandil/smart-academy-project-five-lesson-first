"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { useAppSelector } from "@/lib/hooks";
const navbarItems = [
  { id: 1, name: "Home", url: "/home" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Contact", url: "/contact" },
  { id: 4, name: "Cart", url: "/cart" },
  { id: 5, name: "Deleted Items", url: "/deletedItems" },
  { id: 6, name: "Profile", url: "/profile" },
];

const Navbar = () => {
  const pathname = usePathname();
  const cart = useAppSelector((state) => state.cart);

  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <nav className={styles.header}>
      <div className={styles.navbarContainer}>
        <Link href="/home" className={styles.navbarLogo}>
          my first website
        </Link>

        <div className={styles.navbarMenu}>
          {navbarItems.map((item) => (
            <div className={styles.navbarItem} key={item.id}>
              <Link href={item.url}>{item.name}</Link>
              {item.url === "/cart" && cart.totalQuantity > 0 ? (
                <p className={styles.cartCount}>{cart.totalQuantity}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
