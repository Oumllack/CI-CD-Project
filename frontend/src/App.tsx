import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('Loading...');
  const [error, setError] = useState<string>('');
  const backendUrl = 'https://flask-backend-cvrn3rali9vc739janm0.onrender.com';

  const testBackend = async () => {
    try {
      console.log('Testing backend connection...');
      const response = await fetch(`${backendUrl}/api/hello`);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Data received:', data);
      setMessage(data.message);
      setError('');
    } catch (err) {
      console.error('Full error:', err);
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setMessage('Failed to connect to backend');
    }
  };

  useEffect(() => {
    testBackend();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Projet CI/CD Simple</h1>
        <p>Message du backend : {message}</p>
        <p>Backend URL: {backendUrl}</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={testBackend}>Test Connection</button>
      </header>
    </div>
  );
}

export default App;
