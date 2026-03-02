import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];


    const userExists = existingUsers.find(u => u.email === formData.email);
    if (userExists) {
      setError("User already exists with this email");
      return;
    }

   
    const newUser = { ...formData, id: Date.now() };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Create Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input name="username" placeholder="Username" onChange={handleChange} required style={inputStyle} /><br/>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={inputStyle} /><br/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={inputStyle} /><br/>
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};


const inputStyle = { width: '100%', padding: '10px', margin: '10px 0' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#e50914', color: 'white', border: 'none', cursor: 'pointer' };

export default Register;