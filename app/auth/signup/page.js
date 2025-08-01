'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/Signup.module.css';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful");
      router.push('/auth/login');
    } else {
      alert(data.msg || 'Signup failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className={styles.button}>Signup</button>
      </form>
    </div>
  );
}
