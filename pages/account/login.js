import Head from "next/head";
import Link from "next/link";
import Header from "../../components/header/header";
import styles from "../../styles/Account.module.css";
import { useFormik } from "formik";
import { basicSchema } from "../../lib/schemas";

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
    onSubmit: alert("Message added"),
  });

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

            <button
              className={styles.btn}
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              LOG IN
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default LogIn;
