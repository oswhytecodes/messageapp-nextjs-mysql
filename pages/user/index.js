import Header from "../../components/header/header";
import styles from "../../styles/User.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const UserHome = () => {
  const { data, error } = useSWR(`http://localhost:3000/api/users`, fetcher);
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.center}>
        {data.map((user) => {
          return (
            <ul className={styles.user_list} key={user.userID}>
              <li>
                <i className="fa-regular fa-circle-user"> </i>
                <Link href={`user/${user.userID}`}> {user.username}</Link>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default UserHome;
