'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from '../../../../../styles/EditEvent.module.css';

export default function EditEvent() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    async function fetchEvent() {
      const res = await fetch(`/api/events/${id}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setDate(data.date);
      } else {
        alert('Failed to load event.');
      }
    }
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, date }),
    });
    router.push('/admin/dashboard');
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      alert('Failed to delete the event.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>Title:</label>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className={styles.label}>Description:</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label className={styles.label}>Date:</label>
        <input
          className={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit" className={styles.button}>
          Update Event
        </button>
      </form>

      <button onClick={handleDelete} className={styles.deleteButton}>
        Delete Event
      </button>
    </div>
  );
}
