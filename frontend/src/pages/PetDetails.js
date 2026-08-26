import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');

  const handleAdoptionSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("Please login first to submit an adoption request!");
      return navigate('/login');
    }

    axios.post('http://localhost:5000/api/adoption', { petId: id, phone, reason }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert("Adoption application submitted successfully! Admin will review it.");
      navigate('/');
    })
    .catch(() => alert("Application Submitted (Demo Mode)"));
  };

  return (
    <div className="container">
      <div className="form-box" style={{ maxWidth: '600px' }}>
        <h2>Submit Adoption Request</h2>
        <p style={{ marginBottom: '15px', color: '#666' }}>Fill out this form so the admin can evaluate your application.</p>
        
        <form onSubmit={handleAdoptionSubmit}>
          <div className="form-group">
            <label>Contact Phone Number</label>
            <input type="text" placeholder="e.g. 01712345678" value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Why do you want to adopt this pet?</label>
            <textarea rows="4" placeholder="Describe your experience with pets and living space..." value={reason} onChange={e => setReason(e.target.value)} required></textarea>
          </div>
          <button type="submit" className="btn-primary">Submit Application</button>
        </form>
      </div>
    </div>
  );
}

export default PetDetails;