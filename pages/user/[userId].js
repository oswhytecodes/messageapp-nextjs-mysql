import Header from "../../components/header/header";
import Input from "../../components/message/input";
import Output from "../../components/message/output";
import styles from "../../styles/User.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const User = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data, error } = useSWR(
    userId ? `http://localhost:3000/api/users/${userId}` : null,
    fetcher
  );
  const { mutate } = useSWRConfig();
  const [userMessage, setUserMessage] = useState("");
  const handleChange = (e) => setUserMessage(e.target.value);

  // submit message to database - input component
  const submitMessage = async (e) => {
    e.preventDefault();
    if (userMessage.length >= 3) {
      const response = await fetch(`http://localhost:3000/api/messages`, {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          userMessage: userMessage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      mutate(`http://localhost:3000/api/users/${userId}`);
      setUserMessage("");
    } else {
      alert("Username and message must be at least *3* characters.");
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/messages/${messageId}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            id: messageId,
            userMessage: userMessage,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
  };

  const updateMessage = () => {
    console.log("clicked");
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const username = data.map((user) => user.username);
  username.splice(1);

  return (
    <div className={styles.container}>
      <Header username={username} />
      <div className={styles.message}>
        <Input
          handleChange={handleChange}
          submitMessage={submitMessage}
          userMessage={userMessage}
        />
        <Output
          data={data}
          deleteMessage={deleteMessage}
          updateMessage={updateMessage}
        />
      </div>
    </div>
  );
};

export default User;

/*
const User = ({ messages, userId }) => {
  // userName will be dynamic and be sent from the users table -(but for now it's hardcoded)
  const router = useRouter();
  const {data, error} = useSWR()
  const [messagesList, setMessagesList] = useState(messages);
  const [userMessage, setUserMessage] = useState("");
  const username = messagesList.map((user) => user.username);
  username.splice(1);
  const handleChange = (e) => setUserMessage(e.target.value);

  // submit message to database - input component
  const submitMessage = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/messages`, {
      method: "POST",
      body: JSON.stringify({ userId: userId, userMessage: userMessage }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserMessage("")
  };

  return (
    <div className={styles.container}>
      <Header username={username} />
      <div className={styles.message}>
        <Input handleChange={handleChange} submitMessage={submitMessage} />
        <Output messagesList={messagesList} />
      </div>
    </div>
  );
};

export default User;

export async function getStaticPaths() {
  const response = await fetch(`http://localhost:3000/api/users`);
  const data = await response.json();
  const paths = data.map((user) => {
    return {
      params: {
        userId: `${user.userID}`,
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

// data from database
export async function getStaticProps(context) {
  const { params } = context;
  const { userId } = params;
  const response = await fetch(`http://localhost:3000/api/users/${userId}`);
  const data = await response.json();
  return {
    props: {
      messages: data,
      userId: userId,
    },
  };
}


*/
