import styles from "../../styles/Output.module.css";
import stylesB from "../../styles/Button.module.css";
import { useState} from "react";

// Data Output for the UI
const Output = ({ data, deleteMessage, updateMessage }) => {
  const message = data.map((item) => {
      return (
      <div className={styles.posts} key={item.id}>
        <div className={styles.title}>
          <div className={styles.title_left}>
            <div className={styles.image}></div>
            <span className={styles.title_name}>
              {item.username}
              &nbsp;
            </span>
          </div>
          <ToggleButtons
            deleteMessage={() => deleteMessage(item.id)}
            findMessageToUpdate={() => findMessageToUpdate(item.id)}
          />
        </div>
        <div>
          <span className={styles.message}>{item.userMessage}</span>
        </div>
        <Update updateMessage={updateMessage} itemId={item.id} />
        <span className={styles.date}>
          {
            (new Date(item.date).toDateString(),
            new Date(item.date).toLocaleString())
          }
        </span>
        <hr className={styles.hr} />
      </div>
    );
  });
  return (
    <section className={styles.container}>
      <div className={styles.list}>{message}</div>
    </section>
  );
};
export default Output;

// Update Input field
const Update = ({ updateMessage, itemId }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // handleSubmit takes care of submit button, removes the need for onclick
  const handleSubmit = (e) => {
    // Check if message is too short or setError
    e.preventDefault();
    if (message.length <= 3) {
      setError("Message is too short");
    } else {
      setError("");
      updateMessage(itemId, message);
      setMessage("");
    }
  };
  return (
    <div>
      {/* add instructions for user input */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={stylesB.form}>
          <textarea
            name="message"
            type="text"
            value={message}
            placeholder="Edit text..."
            className={stylesB.input_update}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={stylesB.btn} type="submit">
            <i
              className={`fa-regular fa-circle-check ${stylesB.input_update_btn}`}
            ></i>
          </button>
        </div>
        <p className={stylesB.form_error}>{error}</p>
      </form>
    </div>
  );
};
// Toggle the Edit and Delete buttons
const ToggleButtons = ({ deleteMessage }) => {
  return (
    <div>
      <i className="fa-solid fa-ellipsis" />
      <div className={stylesB.toggle_btns}>
        <button>Edit</button>
        <hr className={stylesB.hr_btn} />
        <button onClick={deleteMessage}>Delete</button>
      </div>
    </div>
  );
};
