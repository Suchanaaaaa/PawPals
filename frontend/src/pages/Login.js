import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'demo_token_123');
    if (email.includes('admin')) {
      localStorage.setItem('role', 'admin');
    } else {
      localStorage.setItem('role', 'user');
    }
    navigate('/');
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Login to PawPals</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} required onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} required onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;