'use client';
import styles from '../../../styles/Profile.module.css';

export default function AdminProfile() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Admin Profile</h2>
      <p className={styles.value}>
        <span className={styles.label}>Email:</span> admin@example.com
      </p>
      <p className={styles.value}>
        <span className={styles.label}>Role:</span> Administrator
      </p>
    </div>
  );
}
