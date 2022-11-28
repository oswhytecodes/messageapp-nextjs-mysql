import Header from "../../components/header/header";
import styles from "../../styles/User.module.css";
import Link from "next/link";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const UserHome = () => {
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
      <div className={styles.center}>{names}</div>
    </div>
  );
};

export default UserHome;
