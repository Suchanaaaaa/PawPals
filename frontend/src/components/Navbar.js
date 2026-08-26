import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h2>PawPals 🐾</h2>
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/submit-pet">Rehome a Pet</Link>
            {role === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;