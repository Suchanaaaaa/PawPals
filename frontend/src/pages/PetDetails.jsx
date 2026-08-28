import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Loading pet details...</h3>;
  if (!pet) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Pet not found!</h3>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <button onClick={() => navigate('/')} style={{ padding: '8px 16px', marginBottom: '20px', backgroundColor: '#555', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        ← Back to Home
      </button>

      <img src={pet.image || 'https://via.placeholder.com/600x350'} alt={pet.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }} />

      <h1 style={{ marginTop: '20px', color: '#2e7d32' }}>{pet.name}</h1>
      <p><strong>Category:</strong> {pet.category}</p>
      <p><strong>Age:</strong> {pet.age} years</p>
      <p><strong>Description:</strong> {pet.description}</p>
      
      {pet.owner && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
          <h3>Posted By:</h3>
          <p><strong>Name:</strong> {pet.owner.name}</p>
          <p><strong>Contact Email:</strong> {pet.owner.email}</p>
        </div>
      )}
    </div>
  );
}