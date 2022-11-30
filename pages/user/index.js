import Header from "../../components/header/header";
import styles from "../../styles/User.module.css";
import Link from "next/link";
import useSWR from "swr";
import { useState, useEffect } from "react";
const fetcher = (url) => fetch(url).then((res) => res.json());

const UserHome = () => {
  const [dark, setDark] = useState(false);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    let mode = JSON.parse(localStorage.getItem("dark"));
    if (mode) {
      setDark(mode);
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.body.classList.add(styles["dark"]);
    } else {
      document.body.classList.remove(styles["dark"]);
    }
    setToggle((prev) => !prev);

    const json = JSON.stringify(dark);
    localStorage.setItem("dark", json);
  }, [dark]);

  // return user names
  const { data, error } = useSWR(`http://localhost:3000/api/users`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const names = data.map((user) => {
    return (
      <ul key={user.userID} className={styles.user_list}>
        <Link href={`user/${user.userID}`}>
          <li className={styles.list_item}>
            <i className="fa-regular fa-circle-user"> </i>
            {user.username}
          </li>
        </Link>
      </ul>
    );
  });

  return (
    <div className={styles.container}>
      <Header />
      <div
        style={{ display: "flex", justifyContent: "center", padding: ".5em" }}
      >
        {toggle ? (
          <i
            onClick={() => setDark((prev) => !prev)}
            className={`fa-solid fa-sun ${styles.sun}`}
          ></i>
        ) : (
          <i
            className={`fa-solid fa-moon ${styles.moon}`}
            onClick={() => setDark((prev) => !prev)}
          ></i>
        )}
      </div>
      <div className={styles.center}>{names}</div>
    </div>
  );
};

export default UserHome;
