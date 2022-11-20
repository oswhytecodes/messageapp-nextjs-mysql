import styles from "../../styles/Output.module.css";
import stylesB from "../../styles/Button.module.css";
import { useState } from "react";

// Data Output for the UI
const Output = ({ data, deleteMessage, updateMessage }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // handleSubmit takes care of submit button, removes the need for onclick

  const [toggle, setToggle] = useState(true);
  const toggleEdit = () => setToggle((prev) => !prev);
  const handleSubmit = (e, itemId) => {
    // Check if message is too short or setError
    e.preventDefault();
    if (message.length <= 3) {
      setError("Message is too short");
    } else {
      setError("");
      updateMessage(itemId, message);
      setMessage("");
      setToggle(prev => !prev)
    }
  };

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
            <i onClick={toggleEdit} className="fa-solid fa-pen"></i>
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
        <form
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
        <p className={stylesB.form_error}>{error}</p>

        
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

// // Update Input field
// const Update = ({ updateMessage, itemId, deleteMessage }) => {
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   // handleSubmit takes care of submit button, removes the need for onclick
//   const handleSubmit = (e) => {
//     // Check if message is too short or setError
//     e.preventDefault();
//     if (message.length <= 3) {
//       setError("Message is too short");
//     } else {
//       setError("");
//       updateMessage(itemId, message);
//       setMessage("");
//       // window.scrollTo(0, 0);
//     }
//   };

//   const [toggle, setToggle] = useState(true);
//   const toggleEdit = () => setToggle((prev) => !prev);
//   return (
//     <div>
//       {/* add instructions for user input */}
//       <div className={stylesB.toggle_btns}>
//         <i onClick={toggleEdit} className="fa-solid fa-pen"></i>
//         <i onClick={deleteMessage} className="fa-solid fa-trash"></i>
//       </div>
//       <form
//         style={{ display: toggle ? "none" : "flex" }}
//         onSubmit={(e) => handleSubmit(e)}
//       >
//         <div className={stylesB.form}>
//           <textarea
//             name="message"
//             type="text"
//             value={message}
//             placeholder="Edit text..."
//             className={stylesB.input_update}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button className={stylesB.btn} type="submit">
//             <i
//               className={`fa-regular fa-circle-check ${stylesB.input_update_btn}`}
//             ></i>
//           </button>
//         </div>
//         <p className={stylesB.form_error}>{error}</p>
//       </form>
//     </div>
//   );
// };
