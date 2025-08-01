'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/AdminDash.module.css';

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    }
    fetchEvents();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h2 className={styles.logo}>Admin Panel</h2>
        <div className={styles.navButtons}>
          <button className={styles.profileButton} onClick={() => router.push('/admin/profile')}>
            Profile
          </button>
          <button className={styles.logoutButton} onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </nav>

      <h1 className={styles.heading}>Admin Dashboard</h1>

      <button
        className={styles.createButton}
        onClick={() => router.push('/admin/events/create')}
      >
        + Create New Event
      </button>

      <div className={styles.eventList}>
        {events.map((event) => (
          <div key={event._id} className={styles.eventCard}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <button
              onClick={() => router.push(`/admin/events/edit/${event._id}`)}
              className={styles.editButton}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
