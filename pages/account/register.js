import Head from "next/head";
import Link from "next/link";
import Header from "../../components/header/header";
import styles from "../../styles/Account.module.css";
import { useFormik } from "formik";
import { basicSchema } from "../../lib/schemas";

const Register = () => {
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

    onSubmit: async (values) => {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: "POST",
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      resetForm({ values: "" });
    },
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
            <h1 className={styles.sign_up_header}>Sign Up Form</h1>
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
              sign up
            </button>
            <div className={styles.login_text}>
              <p>
                Already have an account?
                <Link href="/account/login">
                  <span className={styles.login_link}>Log In</span>
                </Link>
              </p>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Register;
