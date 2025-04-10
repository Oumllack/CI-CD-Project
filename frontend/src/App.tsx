import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('Loading...')
  const [error, setError] = useState<string>('')
  const backendUrl = 'https://ci-cd-project-kpbu.onrender.com'

  const testBackend = async () => {
    console.log('Tentative de connexion au backend...')
    try {
      console.log('Envoi de la requête à:', `${backendUrl}/api/hello`)
      const response = await axios.get(`${backendUrl}/api/hello`)
      console.log('Réponse reçue:', response.data)
      setMessage(response.data.message)
      setError('')
    } catch (err) {
      console.error('Erreur de connexion:', err)
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setMessage('Failed to connect to backend')
    }
  }

  useEffect(() => {
    console.log('Composant monté, appel de testBackend()')
    testBackend()
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#282c34',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{
        padding: '2rem',
        borderRadius: '10px',
        backgroundColor: '#1a1d24',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '600px'
      }}>
        <h1 style={{ color: '#61dafb', marginBottom: '2rem' }}>Projet CI/CD Simple</h1>
        <div style={{
          margin: '1.5rem 0',
          padding: '1rem',
          backgroundColor: '#2d323d',
          borderRadius: '5px'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#a0a0a0', marginBottom: '0.5rem' }}>
            Message du backend :
          </p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#61dafb' }}>
            {message}
          </p>
        </div>
        {error && (
          <p style={{
            color: '#ff6b6b',
            margin: '1rem 0',
            padding: '0.5rem',
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            borderRadius: '5px'
          }}>
            {error}
          </p>
        )}
        <button 
          onClick={testBackend}
          style={{
            backgroundColor: '#61dafb',
            color: '#282c34',
            border: 'none',
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test Connection
        </button>
      </div>
    </div>
  )
}

export default App
