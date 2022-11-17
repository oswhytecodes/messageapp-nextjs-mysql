import styles from "../../styles/Button.module.css";
import { useState } from "react";

const UserToggle = ({updateMessage, deleteMessage}) => {
  const [toggle, setToggle] = useState(true);
  const toggleButton = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div>
      <i className="fa-solid fa-ellipsis" onClick={toggleButton} />
      <div
        style={{ display: toggle ? "none" : "flex" }}
        className={styles.toggle_btns}
      >
        <button
          onClick={updateMessage}
        >Edit</button>
        <hr className={styles.hr_btn} />
        <button
          onClick={deleteMessage}
        >Delete</button>
      </div>
    </div>
  );
};

export default UserToggle;
