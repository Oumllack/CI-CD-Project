import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://flask-backend.onrender.com';

  useEffect(() => {
    fetch(`${backendUrl}/api/hello`)
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, [backendUrl]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Projet CI/CD Simple</h1>
        <p>Message du backend : {message}</p>
      </header>
    </div>
  );
}

export default App;
