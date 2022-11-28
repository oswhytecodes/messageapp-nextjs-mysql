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


// finding the message to update
 // const findMessageToUpdate = async (id) => {
  //   const response = await fetch(`http://localhost:3000/api/messages/${id}`);
  //   const data = await response.json();
  //   const message = data.map((item) => item.userMessage);
  //   return message
  // };

*/


// mapping through data - usernames - USER INDEX
  //  {
     // data.map((user) => {
     //   return (
     //     <ul key={user.userID} className={styles.user_list}>
     //       <Link href={`user/${user.userID}`}>
     //         <li className={styles.list_item}>
     //           <i className="fa-regular fa-circle-user"> </i>
     //           {user.username}
     //         </li>
     //       </Link>
     //     </ul>
     //   );
     // })
  //  }

  