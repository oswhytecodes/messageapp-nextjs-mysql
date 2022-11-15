import Header from "../../components/header/header";
import styles from "../../styles/User.module.css";
// getstaticprop for dynamic path
// [userId].js for a dyamic route from index.js

const UserHome = ({ messages, users }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.center}>
        <h2>Users HomePage</h2>
      </div>
    </div>
  );
};

export default UserHome;

// data from database
