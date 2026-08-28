import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [pendingPets, setPendingPets] = useState([]);
  const [adoptionRequests, setAdoptionRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // ==========================================
  // API Base URL
  // ==========================================
  const API_URL =
    process.env.REACT_APP_API_URL || 'https://paw-pals-backend.vercel.app';


  // ==========================================
  // Get Token
  // ==========================================
  const getToken = () => {
    let token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    return token.replace(/^["']|["']$/g, '').trim();
  };


  // ==========================================
  // Fetch Pending Pets
  // ==========================================
  const fetchPendingPets = useCallback(async () => {
    const token = getToken();

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/pets/admin/pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Failed to load pets'
        );
      }

      setPendingPets(data);

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }, [navigate, API_URL]);


  // ==========================================
  // Fetch Adoption Requests
  // ==========================================
  const fetchAdoptionRequests = useCallback(async () => {
    const token = getToken();

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/adoptions/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Failed to load adoption requests'
        );
      }

      setAdoptionRequests(data);

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }, [navigate, API_URL]);


  // ==========================================
  // Load Dashboard
  // ==========================================
  useEffect(() => {
    const token = getToken();

    if (!token) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    try {
      const payload = JSON.parse(
        atob(token.split('.')[1])
      );

      if (payload.role !== 'admin') {
        alert('Admin access required');
        navigate('/');
        return;
      }

      const loadDashboard = async () => {
        setLoading(true);
        setError('');

        await Promise.all([
          fetchPendingPets(),
          fetchAdoptionRequests()
        ]);

        setLoading(false);
      };

      loadDashboard();

    } catch (err) {
      console.error(err);
      alert('Invalid login session');
      navigate('/login');
    }

  }, [
    navigate,
    fetchPendingPets,
    fetchAdoptionRequests
  ]);


  // ==========================================
  // Approve Pet
  // ==========================================
  const handleApprovePet = async (id) => {
    const token = getToken();

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/pets/admin/approve/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert('Pet approved successfully!');

        setPendingPets((prevPets) =>
          prevPets.filter((pet) => pet._id !== id)
        );

      } else {
        alert(
          data.message || 'Failed to approve pet'
        );
      }

    } catch (err) {
      console.error(err);
      alert('Error connecting to backend');
    }
  };


  // ==========================================
  // Reject Pet
  // ==========================================
  const handleRejectPet = async (id) => {
    const token = getToken();

    if (!token) {
      navigate('/login');
      return;
    }

    const confirmReject = window.confirm(
      'Are you sure you want to reject this pet?'
    );

    if (!confirmReject) {
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/pets/admin/reject/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert('Pet rejected successfully!');

        setPendingPets((prevPets) =>
          prevPets.filter((pet) => pet._id !== id)
        );

      } else {
        alert(
          data.message || 'Failed to reject pet'
        );
      }

    } catch (err) {
      console.error(err);
      alert('Error connecting to backend');
    }
  };


  // ==========================================
  // Approve Adoption Request
  // ==========================================
  const handleApproveAdoption = async (id) => {
    const token = getToken();

    if (!token) {
      navigate('/login');
      return;
    }

    const confirmApprove = window.confirm(
      'Approve this adoption request? The pet will be marked as Adopted.'
    );

    if (!confirmApprove) {
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/adoptions/admin/approve/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert('Adoption approved successfully!');

        await fetchAdoptionRequests();

      } else {
        alert(
          data.message ||
          'Failed to approve adoption request'
        );
      }

    } catch (err) {
      console.error(err);
      alert('Error connecting to backend');
    }
  };


  // ==========================================
  // Reject Adoption Request
  // ==========================================
  const handleRejectAdoption = async (id) => {
    const token = getToken();

    if (!token) {
      navigate('/login');
      return;
    }

    const confirmReject = window.confirm(
      'Are you sure you want to reject this adoption request?'
    );

    if (!confirmReject) {
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/adoptions/admin/reject/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(
          'Adoption request rejected successfully!'
        );

        await fetchAdoptionRequests();

      } else {
        alert(
          data.message ||
          'Failed to reject adoption request'
        );
      }

    } catch (err) {
      console.error(err);
      alert('Error connecting to backend');
    }
  };


  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <h3
        style={{
          textAlign: 'center',
          marginTop: '50px'
        }}
      >
        Loading admin dashboard...
      </h3>
    );
  }


  // ==========================================
  // Error
  // ==========================================
  if (error) {
    return (
      <div
        style={{
          maxWidth: '700px',
          margin: '50px auto',
          padding: '20px',
          textAlign: 'center'
        }}
      >
        <h2>Admin Dashboard</h2>

        <p style={{ color: 'red' }}>
          {error}
        </p>

        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e7d32',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }


  // ==========================================
  // Dashboard UI
  // ==========================================
  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '40px auto',
        padding: '20px'
      }}
    >

      <h1 style={{ color: '#2e7d32' }}>
        Admin Dashboard
      </h1>

      <p style={{ color: '#666' }}>
        Manage pet submissions and adoption requests.
      </p>


      {/* ======================================
          PET SUBMISSIONS
      ====================================== */}

      <h2 style={{ marginTop: '35px' }}>
        🐾 Pet Submissions
      </h2>

      <div
        style={{
          marginTop: '15px',
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeeba',
          borderRadius: '8px'
        }}
      >
        <strong>Pending Submissions:</strong>{' '}
        {pendingPets.length}
      </div>


      {pendingPets.length === 0 ? (

        <div
          style={{
            textAlign: 'center',
            padding: '30px',
            border: '1px solid #ddd',
            borderRadius: '8px'
          }}
        >
          <h3>No pending pet submissions</h3>

          <p>
            All pet submissions have been reviewed.
          </p>
        </div>

      ) : (

        <div
          style={{
            display: 'grid',
            gap: '20px'
          }}
        >

          {pendingPets.map((pet) => (

            <div
              key={pet._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: '#fff'
              }}
            >

              {pet.image && (
                <img
                  src={pet.image}
                  alt={pet.name}
                  style={{
                    width: '180px',
                    height: '140px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '15px'
                  }}
                />
              )}

              <h3>{pet.name}</h3>

              <p>
                <strong>Category:</strong>{' '}
                {pet.category}
              </p>

              <p>
                <strong>Age:</strong>{' '}
                {pet.age} years
              </p>

              <p>
                <strong>Gender:</strong>{' '}
                {pet.gender || 'Not provided'}
              </p>

              <p>
                <strong>Location:</strong>{' '}
                {pet.location || 'Not provided'}
              </p>

              <p>
                <strong>Description:</strong>{' '}
                {pet.description}
              </p>


              {pet.owner && (
                <div
                  style={{
                    marginTop: '15px',
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '6px'
                  }}
                >
                  <strong>Submitted By</strong>

                  <p>
                    Name: {pet.owner.name}
                  </p>

                  <p>
                    Email: {pet.owner.email}
                  </p>
                </div>
              )}


              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  gap: '10px'
                }}
              >

                <button
                  onClick={() =>
                    handleApprovePet(pet._id)
                  }
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#2e7d32',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Approve
                </button>


                <button
                  onClick={() =>
                    handleRejectPet(pet._id)
                  }
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#d32f2f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Reject
                </button>

              </div>

            </div>
          ))}

        </div>
      )}


      {/* ======================================
          ADOPTION REQUESTS
      ====================================== */}

      <h2 style={{ marginTop: '50px' }}>
        📩 Adoption Requests
      </h2>

      <div
        style={{
          marginTop: '15px',
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#e3f2fd',
          border: '1px solid #90caf9',
          borderRadius: '8px'
        }}
      >
        <strong>Total Requests:</strong>{' '}
        {adoptionRequests.length}
      </div>


      {adoptionRequests.length === 0 ? (

        <div
          style={{
            textAlign: 'center',
            padding: '30px',
            border: '1px solid #ddd',
            borderRadius: '8px'
          }}
        >
          <h3>No adoption requests yet</h3>

          <p>
            Adoption applications will appear here.
          </p>
        </div>

      ) : (

        <div
          style={{
            display: 'grid',
            gap: '20px'
          }}
        >

          {adoptionRequests.map((request) => (

            <div
              key={request._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: '#fff'
              }}
            >

              <h3>
                🐾 Pet:{' '}
                {request.pet
                  ? request.pet.name
                  : 'Pet not found'}
              </h3>


              <p>
                <strong>Status:</strong>{' '}
                {request.status}
              </p>


              {/* Adopter */}
              {request.adopter && (
                <div
                  style={{
                    marginTop: '15px',
                    padding: '15px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '6px'
                  }}
                >

                  <h4>👤 Applicant Information</h4>

                  <p>
                    <strong>Name:</strong>{' '}
                    {request.adopter.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{' '}
                    {request.adopter.email}
                  </p>

                  <p>
                    <strong>Phone:</strong>{' '}
                    {request.phone}
                  </p>

                  <p>
                    <strong>Address:</strong>{' '}
                    {request.address}
                  </p>

                </div>
              )}


              {/* Message */}
              <div
                style={{
                  marginTop: '15px',
                  padding: '15px',
                  backgroundColor: '#fafafa',
                  borderRadius: '6px'
                }}
              >

                <strong>
                  Why they want to adopt:
                </strong>

                <p>
                  {request.message}
                </p>

              </div>


              {/* Action Buttons */}
              {request.status === 'Pending' && (

                <div
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    gap: '10px'
                  }}
                >

                  <button
                    onClick={() =>
                      handleApproveAdoption(
                        request._id
                      )
                    }
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#2e7d32',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Approve Adoption
                  </button>


                  <button
                    onClick={() =>
                      handleRejectAdoption(
                        request._id
                      )
                    }
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#d32f2f',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Reject
                  </button>

                </div>

              )}

            </div>

          ))}

        </div>
      )}

    </div>
  );
}