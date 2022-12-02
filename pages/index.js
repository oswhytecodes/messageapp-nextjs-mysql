import Head from "next/head";
import Link from "next/link";
import Header from "../components/header/header";
import styles from "../styles/Home.module.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const Home = () => {
  const { theme } = useContext(AppContext);
  return (
    <div className={`${styles[theme]} ${theme}`}>
      <Head>
        <title>Share Your Thoughts</title>
        <meta
          name="description"
          content="Share your thoughts and save them for tomorrow"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.main_left}>
            <h1>
              A Home for
              <br /> your Thoughts.
            </h1>
            <p>
              Leave a message on your page and come back to see your thoughts.
            </p>
            <div className={styles.container_btns}>
              <Link href="/account/register">
                <button className={styles.btn}>Sign Up</button>
              </Link>
              <Link href="/account/login">
                <button className={styles.btn}>
                  Log In <i className="fa-solid fa-arrow-right"></i>
                </button>{" "}
              </Link>
            </div>
          </div>
          <div className={styles.main_right}>
            <div className={styles.blue_circle}> </div>
          </div>
        </div>
        <footer className={styles.footer}>Made with ❤️ by oswhytecodes</footer>
      </div>
    </div>
  );
};

export default Home;
