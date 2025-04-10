import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('Loading...')
  const [error, setError] = useState<string>('')
  const backendUrl = 'https://ci-cd-project-kpbu.onrender.com'

  const testBackend = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/hello`)
      setMessage(response.data.message)
      setError('')
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setMessage('Failed to connect to backend')
    }
  }

  useEffect(() => {
    testBackend()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Projet CI/CD Simple</h1>
        <div className="message-container">
          <p className="message-label">Message du backend :</p>
          <p className="message-content">{message}</p>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="test-button" onClick={testBackend}>
          Test Connection
        </button>
      </header>
    </div>
  )
}

export default App
