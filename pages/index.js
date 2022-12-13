import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

const Home = () => {
  const { theme } = useContext(AppContext);
  const { session, status } = useSession();
  return (
    <div className={styles[theme]}>
      <Head>
        <title>Share Your Thoughts</title>
        <meta
          name="description"
          content="Share your thoughts and save them for tomorrow"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.main_left}>
            <span className={styles.headline}>
              A Home for
              <br /> your Thoughts.
            </span>
            <p className={styles.para}>
              Leave a message on your page and come back to see your thoughts.
            </p>
            <div className={styles.container_btns}>
              {status === "authenticated" ? (
                <Link className={styles.btn} href="/user">
                  <i title="Sign In" className={`fa-solid fa-user`}>
                    {" "}
                  </i>
                  Visit Your Profile
                </Link>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className={styles.btn}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  <i title="Sign In" className={`fa-solid fa-user`}></i>
                  <span> Sign in</span>
                </Link>
              )}
            </div>
          </div>
          <div className={styles.main_right}>
            <div className={styles.blue_circle}> </div>
          </div>
        </div>
        {/* <Component /> */}
        <footer className={styles.footer}>Made with ❤️ by oswhytecodes</footer>
      </div>
    </div>
  );
};

export default Home;