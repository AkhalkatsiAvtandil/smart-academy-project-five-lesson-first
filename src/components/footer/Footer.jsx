import styles from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav>
          <ul>
            <li>
              <Link href="/">Conditions of use</Link>
            </li>
            <li>
              <Link href="/">Privacy Notice</Link>
            </li>
            <li>
              <Link href="/">Interest-Based ads</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.amazon}>
          <Link href="/">Amazon.com</Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
