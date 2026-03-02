    import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
   
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
     
      localStorage.setItem('loggedUser', JSON.stringify(user));
    
      navigate('/');
     
      window.location.reload(); 
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required style={inputStyle} /><br/>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={inputStyle} /><br/>
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
      <p>New user? <Link to="/register">Register here</Link></p>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '10px', margin: '10px 0' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#e50914', color: 'white', border: 'none', cursor: 'pointer' };

export default Login;