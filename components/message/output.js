import styles from "../../styles/Output.module.css";
import stylesT from "../../styles/Toggle.module.css";
import { useState, useEffect, useMemo } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
// Data Output for the UI
const Output = ({
  data,
  deleteMessage,
  updateMessage,
  addToFavorite,
  deleteFavorite,
}) => {
  const { theme } = useContext(AppContext);

  const [toggle, setToggle] = useState({});
  const toggleEdit = (id) =>
    setToggle({
      ...toggle,
      [id]: !toggle[id],
    });
  const [toggleModal, setToggleModal] = useState({});
  const toggleModalButton = (id) => {
    setToggleModal({
      ...toggleModal,
      [id]: !toggleModal[id],
    });
  };

  const [color, setColor] = useState(
    JSON.parse(localStorage.getItem("favorites")) || {}
  );
  const [toggleFav, setToggleFav] = useState({});

  const toggleFavButton = (id, userId) => {
    setToggleFav({
      ...toggleFav,
      [id]: !toggleFav[id],
    });
    if (!toggleFav[id]) {
      addToFavorite(id);
      setColor({
        ...color,
        [id]: "#990F02",
      });
    } else {
      deleteFavorite(id, userId);
      setColor({
        ...color,
        [id]: "#7e7878",
      });
    }
  };
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(color));
  }, [color]);

  const [value, setValue] = useState("");
  const messages = data // render and filter messages
    .filter((item) => {
      if (value === "") {
        return item;
      } else {
        return item.userMessage.toLowerCase().includes(value.toLowerCase());
      }
    })
    .map((item) => {
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
            itemId={item.id}
            toggle={toggle}
            setToggle={setToggle}
          />
          <DeleteModal
            itemId={item.id}
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
    });
  return (
    <div className={styles.output_container}>
      <div className={styles[theme]}>
        <div className={styles.list}>
          <SearchMessages value={value} setValue={setValue} />
          {messages}
        </div>
      </div>
    </div>
  );
};
export default Output;

// Toggle Edit input form
const Toggle = ({ updateMessage, itemId, toggle, setToggle }) => {
  const { theme } = useContext(AppContext);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // handleSubmit takes care of submit button, removes the need for onclick
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
    <div className={stylesT[theme]}>
      <form
        className={stylesT.form}
        style={{ display: toggle[itemId] ? "flex" : "none" }}
        onSubmit={(e) => handleSubmit(e, itemId)}
      >
        <textarea
          name="message"
          type="text"
          value={message}
          placeholder="Edit text..."
          className={stylesT.input_update}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={stylesT.btn} type="submit">
          <i
            className={`fa-regular fa-circle-check ${stylesT.input_update_btn}`}
          ></i>
        </button>
      </form>
      <p className={stylesT.form_error}>{error}</p>
    </div>
  );
};

// Modal component for deleting messages
const DeleteModal = ({
  deleteMessage,
  itemId,
  toggleModal,
  toggleModalButton,
}) => {
  const { theme } = useContext(AppContext);

  return (
    <div className={stylesT[theme]}>
      <div
        style={{ display: toggleModal[itemId] ? "flex" : "none" }}
        className={stylesT.modal_container}
      >
        <div className={stylesT.modal}>
          <p className={stylesT.text}>
            Are you sure you want to delete this message?
          </p>
          <hr className={stylesT.hr} />
          <div className={stylesT.btn_container}>
            <button
              onClick={() => toggleModalButton(itemId)}
              className={stylesT.modal_btn}
            >
              Keep
            </button>
            <div className={stylesT.vl}></div>
            <button
              onClick={() => deleteMessage(itemId)}
              className={stylesT.modal_btn}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter through messages
export const SearchMessages = ({ value, setValue }) => {
  const [toggleSearch, setToggleSearch] = useState(true);
  const toggleSearchInput = () => setToggleSearch(!toggleSearch);

  return (
    <div className={styles.searchbar}>
      <form
        style={{ display: toggleSearch ? "none" : "flex" }}
        onSubmit={(e) => e.preventDefault()}
        action=""
      >
        <input
          className={styles.searchbar_input}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          value={value}
          name="value"
          placeholder="Search messages..."
        />
      </form>
      <i
        style={{ display: "flex", alignItems: "center" }}
        onClick={toggleSearchInput}
        className={`fas fa-search ${styles.search_icon}`}
      >
        <p
          style={{
            fontSize: ".7em",
            display: toggleSearch ? "flex" : "none",
          }}
        >
          Search Messages
        </p>
      </i>
    </div>
  );
};
