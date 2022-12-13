import Link from "next/link";
import styles from "../../styles/Header.module.css";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Header = ({ username }) => {
  const { theme, setTheme } = useContext(AppContext);
  const { session, status } = useSession();

  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setToggle((prev) => !prev);
  };

  return (
    <div className={styles[theme]}>
      <nav className={styles.nav}>
        <header className={styles.header}>
          <div className={styles.header_left}>
            <Link href="/">
              <h2>Share Your Thoughts</h2>
            </Link>
            <span className={styles.span}>{username}</span>
          </div>
          <div className={styles.header_icons}>
            <li>
              <Link href="/">
                <i className={`fa-solid fa-house ${styles.icon}`}></i>
              </Link>
            </li>
            <li>
              <Link href="/user/">
                <i className={`fa-solid fa-user ${styles.icon}`}></i>
              </Link>
            </li>
            <div>
              <li>
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
              </li>
            </div>
            <li>
              {status === "authenticated" ? (
                <Link
                  href="/"
                  className={styles.auth}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  signout
                </Link>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className={styles.auth}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  signin
                </Link>
              )}
            </li>
          </div>
        </header>
      </nav>
    </div>
  );
};

export default Header;
