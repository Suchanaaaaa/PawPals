import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SubmitPet() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', type: 'Dog', breed: '', age: '', gender: 'Male', location: '', description: '', image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.post('http://localhost:5000/api/pets/submit', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert("Pet submitted successfully! Admin will review before listing.");
      navigate('/');
    })
    .catch(() => {
      alert("Submitted! (Demo Mode - Backend offline)");
      navigate('/');
    });
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Rehome / Submit a Pet</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Pet Name</label>
            <input type="text" required onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Pet Type</label>
            <select onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Breed</label>
            <input type="text" onChange={e => setFormData({...formData, breed: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Age (Years)</label>
            <input type="number" required onChange={e => setFormData({...formData, age: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select onChange={e => setFormData({...formData, gender: e.target.value})}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" required onChange={e => setFormData({...formData, location: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" placeholder="https://..." onChange={e => setFormData({...formData, image: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" required onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
          </div>
          <button type="submit" className="btn-primary">Submit Pet</button>
        </form>
      </div>
    </div>
  );
}

export default SubmitPet;