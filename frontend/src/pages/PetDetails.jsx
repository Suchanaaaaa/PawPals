import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    message: '',
    phone: '',
    address: ''
  });

  const [submitting, setSubmitting] = useState(false);

  // =========================
  // Get Pet Details
  // =========================
  useEffect(() => {
    fetch(`http://localhost:5000/api/pets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPet(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching pet details:', err);
        setLoading(false);
      });
  }, [id]);

  // =========================
  // Submit Adoption Request
  // =========================
  const handleAdoptionRequest = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem('token');

    if (!token) {
      alert('Please login first to request adoption!');
      navigate('/login');
      return;
    }

    token = token.replace(/^["']|["']$/g, '').trim();

    try {
      setSubmitting(true);

      const res = await fetch(
        `http://localhost:5000/api/adoptions/request/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert('Adoption request submitted successfully!');
        setShowForm(false);

        setFormData({
          message: '',
          phone: '',
          address: ''
        });
      } else {
        alert(data.message || 'Failed to submit adoption request');
      }

    } catch (err) {
      console.error(err);
      alert('Error connecting to backend server');
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <h3 style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading pet details...
      </h3>
    );
  }

  // =========================
  // Pet Not Found
  // =========================
  if (!pet || pet.message === 'Pet not found') {
    return (
      <h3 style={{ textAlign: 'center', marginTop: '50px' }}>
        Pet not found!
      </h3>
    );
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}
    >

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '8px 16px',
          marginBottom: '20px',
          backgroundColor: '#555',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back to Home
      </button>

      {/* Pet Image */}
      <img
        src={
          pet.image ||
          'https://via.placeholder.com/600x350'
        }
        alt={pet.name}
        style={{
          width: '100%',
          maxHeight: '400px',
          objectFit: 'cover',
          borderRadius: '8px'
        }}
      />

      {/* Pet Information */}
      <h1
        style={{
          marginTop: '20px',
          color: '#2e7d32'
        }}
      >
        {pet.name}
      </h1>

      <p>
        <strong>Category:</strong> {pet.category}
      </p>

      <p>
        <strong>Age:</strong> {pet.age} years
      </p>

      <p>
        <strong>Gender:</strong> {pet.gender || 'Not provided'}
      </p>

      <p>
        <strong>Location:</strong> {pet.location || 'Not provided'}
      </p>

      <p>
        <strong>Description:</strong> {pet.description}
      </p>

      {/* Owner Information */}
      {pet.owner && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '6px'
          }}
        >
          <h3>Posted By:</h3>

          <p>
            <strong>Name:</strong> {pet.owner.name}
          </p>

          <p>
            <strong>Contact Email:</strong> {pet.owner.email}
          </p>
        </div>
      )}

      {/* ========================= */}
      {/* Request Adoption Button */}
      {/* ========================= */}

      {pet.status === 'Available' && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            width: '100%',
            marginTop: '25px',
            padding: '12px',
            backgroundColor: '#2e7d32',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Request Adoption
        </button>
      )}

      {/* ========================= */}
      {/* Adoption Request Form */}
      {/* ========================= */}

      {showForm && (
        <div
          style={{
            marginTop: '25px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}
        >
          <h2>Adoption Request</h2>

          <form onSubmit={handleAdoptionRequest}>

            {/* Message */}
            <div style={{ marginBottom: '15px' }}>
              <label>
                Why do you want to adopt this pet?
              </label>

              <textarea
                required
                rows="4"
                value={formData.message}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px'
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value
                  })
                }
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '15px' }}>
              <label>Phone Number:</label>

              <input
                type="tel"
                required
                value={formData.phone}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px'
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value
                  })
                }
              />
            </div>

            {/* Address */}
            <div style={{ marginBottom: '15px' }}>
              <label>Address:</label>

              <textarea
                required
                rows="3"
                value={formData.address}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px'
                }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value
                  })
                }
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: submitting
                  ? '#999'
                  : '#2e7d32',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: submitting
                  ? 'not-allowed'
                  : 'pointer'
              }}
            >
              {submitting
                ? 'Submitting...'
                : 'Submit Adoption Request'}
            </button>

            {/* Cancel */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                width: '100%',
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#777',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

          </form>
        </div>
      )}

    </div>
  );
}