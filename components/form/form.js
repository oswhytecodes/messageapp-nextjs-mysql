const Form = () => {
    return (
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
    );
}

export default Form;