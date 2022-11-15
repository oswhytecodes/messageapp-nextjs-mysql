import Head from "next/head";
import Link from "next/link";
import Header from "../components/header/header";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div>
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
         <h2>Welcome to Share your Thoughts</h2> 
          <div className={styles.container_btns}>
            <Link href="/account/register">
              <button className={styles.btn}>Sign Up</button>
            </Link>
            <Link href="/account/login">
              <button className={styles.btn}>Log In</button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
