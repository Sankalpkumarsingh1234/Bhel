// Login.jsx
import axios from 'axios';
import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);

      // ✅ Pass full user object
      onLogin({ name: res.data.name, email: res.data.email });
    } catch (err) {
      alert("Login failed");
      console.error(err.response?.data || err.message);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
    margin: 'auto'
  };

  const inputStyle = {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px'
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const buttonHoverStyle = {
    backgroundColor: '#2980b9'
  };

  return (
    <form onSubmit={handleLogin} style={formStyle}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
        style={inputStyle}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={inputStyle}
      />
      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
      >
        Login
      </button>
    </form>
  );
}

