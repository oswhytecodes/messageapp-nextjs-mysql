import Header from "../../components/header/header";
import styles from "../../styles/User.module.css";

// getstaticprop for dynamic path
// [userId].js for a dyamic route from index.js

const UserHome = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.center}>
      </div>
    </div>
  );
};

export default UserHome;