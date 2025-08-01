import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to Internal Event Scheduler</h1>
      <p className={styles.subtitle}>Plan. Manage. Participate.</p>
      <div className={styles.links}>
        <a href="/auth/login" className={styles.link}>Login</a>
        <a href="/auth/signup" className={styles.link}>Signup</a>
      </div>
    </div>
  );
}
