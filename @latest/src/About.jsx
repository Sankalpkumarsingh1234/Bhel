// About.jsx
import React from 'react';

export default function About() {
  return (
    <div style={{
      padding: '50px',
      color: '#fff',
      backgroundColor: 'rgba(0,0,0,0.6)',
      minHeight: '100vh'
    }}>
      <h1>About Us</h1>
      <p>
        Welcome to our intelligent machine monitoring platform. We help industries
        monitor energy consumption and predict machine failure using AI/ML.
      </p>
      <p>
        Our system integrates with sensor data, offers real-time analytics, and allows
        engineers to make proactive maintenance decisions. Built using React, Streamlit,
        and MongoDB, it’s a complete end-to-end solution for modern manufacturing.
      </p>
      <p><strong>Developed by:</strong> Sankalp & Team</p>
    </div>
  );
}
