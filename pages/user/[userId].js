import Input from "../../components/message/input";
import Output from "../../components/message/output";
import styles from "../../styles/User.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const User = () => {
  const router = useRouter();
  const { theme } = useContext(AppContext);

  const { userId } = router.query;
  const { data, error } = useSWR(
    userId ? `http://localhost:3000/api/users/${userId}` : null,
    fetcher
  );
  const { mutate } = useSWRConfig();

  // submit message to database - input component
  const submitMessage = async (userId, userMessage) => {
    try {
      const response = await fetch(`http://localhost:3000/api/messages`, {
        method: "POST",
        body: JSON.stringify({
          userId,
          userMessage,
          favorite: 0,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      mutate(`http://localhost:3000/api/users/${userId}`);
      setUserMessage("");
    } catch (error) {
      return error;
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/messages`, {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      mutate(`http://localhost:3000/api/users/${userId}`);
    } catch (error) {
      return error;
    }
  };

  const updateMessage = async (id, message) => {
    try {
      const response = await fetch(`http://localhost:3000/api/messages/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          userMessage: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      mutate(`http://localhost:3000/api/users/${userId}`);
    } catch (error) {
      return error;
    }
  };

  // FAVORITES
  const addToFavorite = async (messageId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/messages/favorites`,
        {
          method: "POST",
          body: JSON.stringify({
            messageId: messageId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      mutate(`http://localhost:3000/api/users/${userId}`);
    } catch (error) {
      return error;
    }
  };
  const deleteFavorite = async (id, userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/messages/favorites`,
        {
          method: "DELETE",
          body: JSON.stringify({
            messageId: id,
            userId: userId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      mutate(`http://localhost:3000/api/users/${userId}`);
    } catch (error) {
      return error;
    }
  };


  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const username = data.map((user) => user.username);
  username.splice(1);

  return (
    <div className={styles[theme]}>
      <div className={styles.container}>
        <div className={styles.message}>
          <Input userId={userId} submitMessage={submitMessage} />
          <Output
            data={data}
            deleteMessage={deleteMessage}
            updateMessage={updateMessage}
            addToFavorite={addToFavorite}
            deleteFavorite={deleteFavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
