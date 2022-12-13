import styles from "../../styles/Output.module.css";
import stylesT from "../../styles/Toggle.module.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Toggle } from "./output";
import { DeleteModal } from "./output";

const List = ({
  item,
  itemId,
  color,
  updateMessage,
  toggle,
  setToggle,
  deleteMessage,
  toggleModal,
  toggleEdit,
  setToggleModal,
  toggleModalButton,
  toggleFavButton
}) => {
  const { theme } = useContext(AppContext);

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
        <div className={stylesT[theme]}>
          <div className={stylesT.toggle_btns}>
            <i
              onClick={() => toggleEdit(item.id)}
              className={`fa-solid fa-pen ${stylesT.pen_icon}`}
            ></i>
            <i
              onClick={() => toggleModalButton(item.id)}
              className={`fa-solid fa-trash ${stylesT.trash_icon}`}
            ></i>
            <i
              style={{ color: color[item.id] }}
              onClick={() => toggleFavButton(item.id, item.userID)}
              className={`fa-regular fa-heart ${stylesT.heart_icon}`}
            ></i>
          </div>
        </div>
      </div>
      <div>
        <span className={styles.message}>{item.userMessage}</span>
      </div>
      {/* update button hidden by toggle */}
      <Toggle
        updateMessage={updateMessage}
        itemId={itemId}
        toggle={toggle}
        setToggle={setToggle}
      />
      <DeleteModal
        itemId={itemId}
        deleteMessage={deleteMessage}
        toggleModal={toggleModal}
        setToggleModal={setToggleModal}
        toggleModalButton={toggleModalButton}
      />
      <span className={styles.date}>
        {
          (new Date(item.date).toDateString(),
          new Date(item.date).toLocaleString())
        }
      </span>
      <hr className={styles.hr} />
    </div>
  );
};

export default List;
