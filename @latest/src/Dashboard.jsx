// Dashboard.jsx
import React from 'react';
import './Dashboard.css';

export default function Dashboard({ user, history }) {
  return (
    <div className="dashboard-container">
      <div className="welcome-card">
        <h2>Welcome, {user.name}</h2>
        <p className="email">({user.email})</p>
        <div className="streamlit-buttons">
          <button className="streamlit-btn" onClick={() => {
            window.open(`http://localhost:8501?email=${user.email}`, '_blank');
          }}>🛠️ Machine Failure Type</button>

          <button className="streamlit-btn failure" onClick={() => {
            window.open(`http://localhost:8502?email=${user.email}`, '_blank');
          }}>⚡ Energy Consumption</button>

          <button className="streamlit-btn" onClick={() => {
            window.open(`http://localhost:8508?email=${user.email}`, '_blank');
          }}>🛠️ Machine Part Failure</button>
        </div>
      </div>

      <div className="history-card">
        <h3>📜 Prediction History</h3>
        {history.length > 0 ? (
          <ul className="history-list">
            {history.map((h, i) => (
              <li key={i}>
                <span className="prediction">{h.prediction}</span>
                <span className="timestamp">{new Date(h.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">No predictions yet.</p>
        )}
      </div>
    </div>
  );
}

