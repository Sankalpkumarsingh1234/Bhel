
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import About from './About';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user?.email) {
      console.log("Fetching history for:", user.email);
      axios.get(`http://localhost:4000/api/history?email=${user.email}`)
        .then(res => {
          setHistory(res.data);
        })
        .catch((err) => {
          console.error("Error fetching history:", err);
          setHistory([]);
        });
    }
  }, [user]);

  const styles = {
    body: {
      background: `url('https://upload.wikimedia.org/wikipedia/commons/9/9c/Welding_in_progress.jpg') no-repeat center center fixed`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: 'Segoe UI, sans-serif'
    },
    nav: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '20px',
      padding: '15px 30px',
      background: 'rgba(0, 0, 0, 0.7)'
    },
    navLink: {
      color: '#ecf0f1',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '16px'
    },
    authContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '85vh'
    },
    authCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      width: '90%',
      maxWidth: '400px',
      textAlign: 'center',
      color: '#2c3e50'
    },
    heading: {
      marginBottom: '20px',
      color: '#2c3e50'
    },
    linkButton: {
      background: 'none',
      border: 'none',
      color: '#2980b9',
      cursor: 'pointer',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.nav}>
        <Link to="/about" style={styles.navLink}>About Us</Link>
      </div>

      <Routes>
        <Route path="/" element={
          !user ? (
            <div style={styles.authContainer}>
              <div style={styles.authCard}>
                {showLogin ? (
                  <>
                    <h2 style={styles.heading}>🔐 Login</h2>
                    <Login onLogin={setUser} />
                    <p>
                      Don't have an account? <button onClick={() => setShowLogin(false)} style={styles.linkButton}>Register</button>
                    </p>
                  </>
                ) : (
                  <>
                    <h2 style={styles.heading}>📝 Register</h2>
                    <Register onRegisterSuccess={() => setShowLogin(true)} />
                    <p>
                      Already have an account? <button onClick={() => setShowLogin(true)} style={styles.linkButton}>Login</button>
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <Dashboard user={user} history={history} />
          )
        } />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;










