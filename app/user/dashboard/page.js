'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/UserDash.module.css';

export default function UserDashboard() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    }

    fetchEvents();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.navbar}>
        
        <h2 className={styles.navTitle}>User Dashboard</h2>
        <button className={styles.navButton} onClick={() => router.push('/user/profile')}>
          Profile
        </button>
        <button className={styles.logoutButton} onClick={logoutHandler}>
          Logout
        </button>
      </div>
      
      <h1 className={styles.heading}>User Dashboard</h1>
      <div className={styles.container}>
        <div className={styles.eventList}>
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className={styles.eventCard}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>Date: {event.date}</p>
              </div>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
