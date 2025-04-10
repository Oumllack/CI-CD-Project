import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://flask-backend-cvrn3rali9vc739janm0.onrender.com';

  useEffect(() => {
    console.log('Trying to fetch from:', `${backendUrl}/api/hello`);
    fetch(`${backendUrl}/api/hello`)
      .then(response => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data);
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Error connecting to backend');
      });
  }, [backendUrl]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Projet CI/CD Simple</h1>
        <p>Message du backend : {message}</p>
        <p>Backend URL: {backendUrl}</p>
      </header>
    </div>
  );
}

export default App;
