import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = () => {
    fetch('http://localhost:5000/api/pets')
      .then((res) => res.json())
      .then((data) => {
        // টোকেন থেকে আইডি না নিয়ে সাধারণ ফিল্টার (বা সব ডেটা প্রদর্শন)
        setMyPets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first');

    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/pets/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (res.ok) {
          alert('Pet deleted successfully!');
          fetchPets(); // লিস্ট রিফ্রেশ করা
        } else {
          alert(data.message || 'Failed to delete');
        }
      } catch (err) {
        alert('Error connecting to backend');
      }
    }
  };

  if (loading) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Loading dashboard...</h3>;

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      <h2>Manage Listed Pets</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#2e7d32', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Category</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Age</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {myPets.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '15px' }}>No pets found.</td>
            </tr>
          ) : (
            myPets.map((pet) => (
              <tr key={pet._id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{pet.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{pet.category}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{pet.age} years</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button 
                    onClick={() => handleDelete(pet._id)} 
                    style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}