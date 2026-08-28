import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/pets')
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching pets:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Loading pets...</h3>;

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2e7d32', marginBottom: '30px' }}>Available Pets for Adoption</h1>
      
      {pets.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No pets available right now.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {pets.map((pet) => (
            <div key={pet._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <img 
                src={pet.image || 'https://via.placeholder.com/250x180?text=No+Image'} 
                alt={pet.name} 
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px' }} 
              />
              <h3 style={{ marginTop: '10px', color: '#333' }}>{pet.name}</h3>
              <p><strong>Category:</strong> {pet.category}</p>
              <p><strong>Age:</strong> {pet.age} years</p>
              <p style={{ color: '#666', fontSize: '14px' }}>{pet.description.substring(0, 60)}...</p>
              
              <Link to={`/pet/${pet._id}`}>
                <button style={{ width: '100%', padding: '8px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}