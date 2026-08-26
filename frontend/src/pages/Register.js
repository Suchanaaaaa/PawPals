import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Account created! Now please login.');
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Register Account</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={name} required onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} required onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} required onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Register As</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="user">User / Adopter</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;