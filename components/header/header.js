import Link from "next/link";
import styles from "../../styles/Header.module.css";

const Header = ({ username}) => {
  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <h2>Share Your Thoughts</h2>
        <span className={styles.span}>{username}</span>
      </div>
      <div className={styles.header_icons}>
        <Link href="/user/">
          <i className={`fa-solid fa-user ${styles.icon}`}></i>
        </Link>
        <Link href="/">
          <i className={`fa-solid fa-house ${styles.icon}`}></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
