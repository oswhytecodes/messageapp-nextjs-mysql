import styles from "../../styles/Output.module.css";
import stylesB from "../../styles/Button.module.css";
import { useState } from "react";

// Data Output for the UI
const Output = ({ data, deleteMessage, updateMessage }) => {
  // const [message, setMessage] = useState("");
  // const [error, setError] = useState("");
  // // handleSubmit takes care of submit button, removes the need for onclick

  const [toggle, setToggle] = useState({});
  const toggleEdit = (id) =>
    setToggle({
      ...toggle,
      [id]: !toggle[id],
    });

  console.log(toggle);
  // const handleSubmit = (e, itemId) => {
  //   // Check if message is too short or setError
  //   e.preventDefault();
  //   if (message.length <= 3) {
  //     setError("Message is too short");
  //   } else {
  //     setError("");
  //     updateMessage(itemId, message);
  //     setMessage("");
  //     setToggle(prev => !prev)
  //   }
  // };

  const messages = data.map((item) => {
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
          <div className={stylesB.toggle_btns}>
            <i
              onClick={() => toggleEdit(item.id)}
              className="fa-solid fa-pen"
            ></i>
            <i
              onClick={() => deleteMessage(item.id)}
              className="fa-solid fa-trash"
            ></i>
          </div>
        </div>
        <div>
          <span className={styles.message}>{item.userMessage}</span>
        </div>

        {/* update button hidden by toggle */}

        <Toggle
          updateMessage={updateMessage}
          itemId={item.id}
          toggle={toggle}
          setToggle={setToggle}
        />

        {/* <form
          className={stylesB.form}
          style={{ display: toggle ? "none" : "flex" }}
          onSubmit={(e) => handleSubmit(e, item.id)}
        >
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
        </form>
        <p className={stylesB.form_error}>{error}</p> */}

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
      <div className={styles.list}>{messages}</div>
    </section>
  );
};
export default Output;

const Toggle = ({ updateMessage, itemId, toggle, setToggle }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // handleSubmit takes care of submit button, removes the need for onclick

  // const [toggle, setToggle] = useState(true);
  // const toggleEdit = () => setToggle((prev) => !prev);
  const handleSubmit = (e, itemId) => {
    // Check if message is too short or setError
    e.preventDefault();
    if (message.length <= 3) {
      setError("Message is too short");
    } else {
      setError("");
      updateMessage(itemId, message);
      setMessage("");
      setToggle((prev) => !prev);
    }
  };
  return (
    <div>
      <form
        className={stylesB.form}
        style={{ display: toggle[itemId] ? "flex" : "none" }}
        onSubmit={(e) => handleSubmit(e, itemId)}
      >
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
      </form>
      <p className={stylesB.form_error}>{error}</p>
    </div>
  );
};
