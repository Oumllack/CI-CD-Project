import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('Loading...');
  const backendUrl = 'https://flask-backend-cvrn3rali9vc739janm0.onrender.com';

  useEffect(() => {
    console.log('Starting fetch...');
    fetch(`${backendUrl}/api/hello`)
      .then(response => {
        console.log('Response received:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error details:', error);
        setMessage(`Error: ${error.message}`);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Projet CI/CD Simple</h1>
        <p>Message du backend : {message}</p>
        <p>Backend URL: {backendUrl}</p>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </header>
    </div>
  );
}

export default App;
