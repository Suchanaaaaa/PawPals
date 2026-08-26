import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  const dummyPets = [
    {
      _id: '1',
      name: 'Bella',
      type: 'Dog',
      breed: 'Labrador Retriever',
      age: 2,
      gender: 'Female',
      location: 'Sylhet',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=400',
      description: 'Friendly and vaccinated dog looking for a loving home.'
    },
    {
      _id: '2',
      name: 'Milo',
      type: 'Cat',
      breed: 'Persian',
      age: 1,
      gender: 'Male',
      location: 'Dhaka',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400',
      description: 'Playful kitten, toilet trained and healthy.'
    }
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/api/pets')
      .then(res => setPets(res.data.length > 0 ? res.data : dummyPets))
      .catch(() => setPets(dummyPets));
  }, []);

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) || 
                          pet.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' || pet.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="container">
      <h1>Find Your New Best Friend 🐶🐱</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>Browse pets available for adoption near you.</p>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <input 
          type="text" 
          placeholder="Search by name or location..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select 
          value={filterType} 
          onChange={e => setFilterType(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="All">All Types</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Rabbit">Rabbit</option>
        </select>
      </div>

      <div className="pet-grid">
        {filteredPets.map(pet => (
          <div key={pet._id} className="pet-card">
            <img src={pet.image} alt={pet.name} />
            <div className="pet-info">
              <h3>{pet.name}</h3>
              <p><strong>Type:</strong> {pet.type} ({pet.breed})</p>
              <p><strong>Age:</strong> {pet.age} years | <strong>Gender:</strong> {pet.gender}</p>
              <p><strong>Location:</strong> {pet.location}</p>
              <Link to={`/pet/${pet._id}`}>
                <button className="btn-primary">View Details & Adopt</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;