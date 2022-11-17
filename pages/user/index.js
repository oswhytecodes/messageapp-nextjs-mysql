import Header from "../../components/header/header";
import Output from "../../components/message/output";
import styles from "../../styles/User.module.css";
// getstaticprop for dynamic path
// [userId].js for a dyamic route from index.js

const UserHome = ({  }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.center}>
        <Output />
      </div>
    </div>
  );
};

export default UserHome;

// data from database
export async function getStaticProps() {
  const response = await fetch(`http://localhost:3000/api/users`);
  const data = await response.json();
  return {
    props: {
      messages: data,
    },
  };
}