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

    // Remove extra quotation marks and spaces from token
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
        // Show backend success message
        alert(
          data.message ||
          'Pet submitted successfully! Waiting for admin approval.'
        );

        navigate('/');
      } else {
        alert(data.message || 'Failed to submit pet');
      }

    } catch (err) {
      alert('Error connecting to backend server');
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px'
      }}
    >
      <h2>Submit a Pet for Adoption</h2>

      <form onSubmit={handleSubmit}>

        {/* Pet Name */}
        <div style={{ marginBottom: '15px' }}>
          <label>Pet Name:</label>

          <input
            type="text"
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px'
            }}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: '15px' }}>
          <label>Category:</label>

          <select
            value={formData.category}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px'
            }}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value
              })
            }
          >
            <option value="Cat">Cat (বিড়াল)</option>
            <option value="Dog">Dog (কুকুর)</option>
            <option value="Bird">Bird (পাখি)</option>
            <option value="Rabbit">Rabbit (খরগোশ)</option>
            <option value="Fish">Fish / Aquarium (মাছ)</option>
            <option value="Other">Other (অন্যান্য)</option>
          </select>
        </div>

        {/* Age */}
        <div style={{ marginBottom: '15px' }}>
          <label>Age (in years):</label>

          <input
            type="number"
            required
            min="0"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px'
            }}
            onChange={(e) =>
              setFormData({
                ...formData,
                age: e.target.value
              })
            }
          />
        </div>

        {/* Gender */}
        <div style={{ marginBottom: '15px' }}>
          <label>Gender:</label>

          <select
            value={formData.gender}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px'
            }}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender: e.target.value
              })
            }
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>

        {/* Location */}
        <div style={{ marginBottom: '15px' }}>
          <label>Location:</label>

          <input
            type="text"
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px'
            }}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: e.target.value
              })
            }
          />
        </div>

        {/* Image */}
        <div style={{ marginBottom: '15px' }}>
          <label>Image URL:</label>

          <input
            type="text"
            placeholder="https://images.unsplash.com/..."
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px'
            }}
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.value
              })
            }
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: '15px' }}>
          <label>Description:</label>

          <textarea
            required
            rows="4"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px'
            }}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
            }
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2e7d32',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit Pet
        </button>

      </form>
    </div>
  );
}

