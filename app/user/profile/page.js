'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/Profile.module.css';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!isClient) return <p>Loading...</p>;
  if (!user) {
    router.push('/login'); // fallback
    return null;
  }

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
