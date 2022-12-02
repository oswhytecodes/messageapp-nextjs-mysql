import Link from "next/link";
import styles from "../../styles/Header.module.css";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Header = ({ username }) => {
  const { theme, setTheme } = useContext(AppContext);
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setToggle((prev) => !prev);
  };

  return (
    <div className={styles[theme]}>
      <header className={styles.header}>
        <div className={styles.header_left}>
          <Link href="/">
            <h2>Share Your Thoughts</h2>
          </Link>
          <span className={styles.span}>{username}</span>
        </div>
        <div className={styles.header_icons}>
          <Link href="/">
            <i className={`fa-solid fa-house ${styles.icon}`}></i>
          </Link>
          <Link href="/user/">
            <i className={`fa-solid fa-user ${styles.icon}`}></i>
          </Link>
          <div>

          {toggle ? (
            <i
              onClick={handleClick}
              className={`fa-solid fa-sun ${styles.sun} ${styles.icon}`}
            ></i>
          ) : (
            <i
              className={`fa-solid fa-moon ${styles.moon} ${styles.icon}`}
              onClick={handleClick}
            ></i>
          )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
