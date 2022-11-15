import Header from "../../components/header/header";
import Input from "../../components/message/input";
import Output from "../../components/message/output";
import styles from "../../styles/User.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
// getstaticprop for dynamic path
// [userId].js for a dyamic route from index.js

const User = ({ messages }) => {
  // userName will be dynamic and be sent from the users table -(but for now it's hardcoded)
  const router = useRouter();
  const [messagesList, setMessagesList] = useState(messages);
  const [username, setUsername] = useState(messages.username);

  // submit message to database - input component
  const submitMessage = async (e) => {
    e.preventDefault();
    const response = await fetch(`api/messages`, {
      method: "POST",
      body: JSON.stringify({ userMessage: userMessage }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };
  return (
    <div className={styles.container}>
      <Header username={username} />
      <div className={styles.message}>
        <Input submitMessage={submitMessage} />
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
    },
  };
}
