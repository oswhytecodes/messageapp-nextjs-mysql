import styles from "../../styles/Input.module.css";

const Input = ({ handleChange, submitMessage, userMessage }) => {
  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <div className={styles.text_container}>
          <textarea
            className={styles.textarea}
            onChange={handleChange}
            name="message"
            value={userMessage}
            placeholder="Share Thoughts..."
          ></textarea>
        </div>
        <div className={styles.btns}>
          <button
            onClick={submitMessage}
            className={styles.form_btn}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Input;
