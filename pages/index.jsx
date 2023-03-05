import styles from "../styles/Home.module.css";
import MainComponent from "../components/Main";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <MainComponent></MainComponent>
      </main>
    </div>
  );
}
