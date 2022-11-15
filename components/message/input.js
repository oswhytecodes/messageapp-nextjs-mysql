import { useState } from "react";
import styles from "../../styles/Input.module.css";

const Input = ({ username, submitMessage }) => {
  const [userMessage, setUserMessage] = useState("");

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <div className={styles.text_container}>
          <textarea
            className={styles.textarea}
            onChange={(e) => setUserMessage(e.target.value)}
            name="message"
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
