import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubmitPet() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cat',
    age: '',
    gender: 'Female',
    location: '',
    description: '',
    image: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');

    if (!token) {
      alert('Please login first to submit a pet!');
      navigate('/login');
      return;
    }

    // টোকেন থেকে অতিরিক্ত কোটেশন বা স্পেস ছেঁটে ফেলা
    token = token.replace(/^["']|["']$/g, '').trim();

    try {
      const res = await fetch('http://localhost:5000/api/pets/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Pet submitted successfully!');
        navigate('/');
      } else {
        alert(data.message || 'Failed to submit pet');
      }
    } catch (err) {
      alert('Error connecting to backend server');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Submit a Pet for Adoption</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Pet Name:</label>
          <input
            type="text"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Category:</label>
          <select
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Cat">Cat (বিড়াল)</option>
            <option value="Dog">Dog (কুকুর)</option>
            <option value="Bird">Bird (পাখি)</option>
            <option value="Rabbit">Rabbit (খরগোশ)</option>
            <option value="Fish">Fish / Aquarium (মাছ)</option>
            <option value="Other">Other (অন্যান্য)</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Age (in years):</label>
          <input
            type="number"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Gender:</label>
          <select
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Location:</label>
          <input
            type="text"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Image URL:</label>
          <input
            type="text"
            placeholder="https://images.unsplash.com/..."
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description:</label>
          <textarea
            required
            rows="4"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </div>

        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Submit Pet
        </button>
      </form>
    </div>
  );
}