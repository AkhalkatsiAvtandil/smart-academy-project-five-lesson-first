import Link from "next/link";
import styles from "./Navbar.module.css";
const navbarItems = [
  { id: 1, name: "Home", url: "/home" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Contact", url: "/contact" },
  { id: 4, name: "Cart", url: "/cart" },
];

const Navbar = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.navbarLogo}>
          my first website
        </Link>
        <div className={styles.navbarMenu}>
          {navbarItems.map((item) => (
            <div className={styles.navbarItem} key={item.id}>
              <Link href={item.url}>{item.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
