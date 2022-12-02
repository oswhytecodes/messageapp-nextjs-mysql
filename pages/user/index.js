import Header from "../../components/header/header";
import styles from "../../styles/Users.module.css";
import Link from "next/link";
import useSWR from "swr";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

const UserHome = () => {
  const { theme } = useContext(AppContext);

  // return user names
  const { data, error } = useSWR(`http://localhost:3000/api/users`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const names = data.map((user) => {
    return (
      <div key={user.userID} className={styles[theme]}>
        <ul className={styles.user_list}>
          <Link href={`user/${user.userID}`}>
            <li className={styles.list_item}>
              <i className="fa-regular fa-circle-user"> </i>
              {user.username}
            </li>
          </Link>
        </ul>
      </div>
    );
  });

  return (
    <div className={styles[theme]}>
      <div className={styles.container}>
        <Header />
        <div
          style={{ display: "flex", justifyContent: "center", padding: ".5em" }}
        ></div>
        <div className={styles.center}>{names}</div>
      </div>
    </div>
  );
};

export default UserHome;
