import styles from "../../styles/Output.module.css";

const Output = ({ messagesList }) => {
  const message = messagesList.map((item) => {
    return (
      <div className={styles.posts} key={item.id}>
        <div className={styles.title}>
          <div className={styles.title_left}>
            <div className={styles.image}></div>
            <span className={styles.title_name}>
              {item.username}
              &nbsp;
            </span>
          </div>
          <i 
            className="fa-solid fa-ellipsis"
            onClick={() => console.log("clicked")}
          />
        </div>

        <span className={styles.message}>{item.userMessage}</span>
        <span className={styles.date}>
          {
            (new Date(item.date).toDateString(),
            new Date(item.date).toLocaleString())
          }
        </span>
        <hr className={styles.hr} />
      </div>
    );
  });
  return (
    <section className={styles.container}>
      <div className={styles.list}>{message}</div>
    </section>
  );
};

export default Output;
