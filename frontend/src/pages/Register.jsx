import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://paw-pals-backend.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Account created! Now please login.');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Error connecting to backend server');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Register on PawPals</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Full Name:</label>
          <input
            type="text"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Register As:</label>
          <select
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="user">User / Adopter</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Register
        </button>
      </form>
    </div>
  );
}