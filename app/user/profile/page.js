'use client';
import { useEffect, useState } from 'react';
import styles from '../../../styles/Profile.module.css';

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error('Failed to parse user from localStorage:', err);
        }
      }
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>User Profile</h2>
      <p className={styles.value}>
        <span className={styles.label}>Name:</span> {user.name}
      </p>
      <p className={styles.value}>
        <span className={styles.label}>Email:</span> {user.email}
      </p>
      <p className={styles.value}>
        <span className={styles.label}>Role:</span> User
      </p>
    </div>
  );
}
