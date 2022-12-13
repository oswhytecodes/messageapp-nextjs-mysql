import Head from "next/head";
import Link from "next/link";
import Header from "../header/header";
import styles from "../../styles/Account.module.css";
import { useFormik } from "formik";
import { basicSchema } from "../../lib/schemas";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const LogIn = () => {
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: basicSchema,
    // onSubmit: alert("Message added"),
  });
  const { data, error } = useSWR(`http://localhost:3000/api/users`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const userId = data.map((id) => id.userID);
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
        <main className={styles.main}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.sign_up_header}>USER login</h1>
            <label htmlFor="username">Username</label>
            <input
              className={styles.input}
              id="username"
              name="username"
              type="text"
              onChange={handleChange}
              value={values.username}
              onBlur={handleBlur}
            />

            <label htmlFor="password">Password</label>
            <input
              className={styles.input}
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />
            <Link href={`user/${userId}`}>
              <button
                className={styles.btn}
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                LOG IN
              </button>
            </Link>
          </form>
        </main>
      </div>
    </div>
  );
};

export default LogIn;
