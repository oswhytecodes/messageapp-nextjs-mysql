import styles from "../../styles/Input.module.css";
import { useState } from "react";

const Input = ({ userId, submitMessage }) => {
  // fix logic in Input component
  const [userMessage, setUserMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userMessage.length <= 3) {
      setError("Message is too short");
    } else {
      setError("");
      submitMessage(userId, userMessage);
      setUserMessage("");
    }
  };
  return (
    <section className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div className={styles.text_container}>
          <textarea
            className={styles.textarea}
            name="message"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Share Thoughts..."
          ></textarea>
        </div>
        {error}
        <div className={styles.btns}>
          <button className={styles.form_btn} type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Input;
