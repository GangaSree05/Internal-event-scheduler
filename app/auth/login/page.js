'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/Login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      if (data.role === 'admin') router.push('/admin/dashboard');
      else router.push('/user/dashboard');
    } else {
      alert(data.msg || 'Login failed');
    }
  }

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
}
