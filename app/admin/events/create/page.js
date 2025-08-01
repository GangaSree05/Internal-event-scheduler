'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../../styles/Events.module.css';

export default function CreateEvent() {
  const [form, setForm] = useState({ title: '', description: '', date: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    router.push('/admin/dashboard');
  };

  return (
    <div className={styles.container}>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className={styles.textarea}
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          className={styles.dateInput}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <button type="submit" className={styles.button}>Create</button>
      </form>
    </div>
  );
}
