import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('Loading...')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const backendUrl = 'https://ci-cd-project-kpbu.onrender.com'

  const testBackend = async () => {
    setIsLoading(true)
    console.log('Tentative de connexion au backend...')
    try {
      console.log('Envoi de la requête à:', `${backendUrl}/api/hello`)
      const response = await axios.get(`${backendUrl}/api/hello`)
      console.log('Réponse reçue:', response.data)
      setMessage(response.data.message)
      setError('')
    } catch (err) {
      console.error('Erreur de connexion:', err)
      if (axios.isAxiosError(err)) {
        setError(`Erreur: ${err.message} - ${err.response?.status} ${err.response?.statusText}`)
      } else {
        setError(`Erreur: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
      setMessage('Failed to connect to backend')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('Composant monté, appel de testBackend()')
    testBackend()
  }, [])

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="app-header">
          <h1>Projet CI/CD Simple</h1>
          <p className="subtitle">Démonstration d'une application moderne</p>
        </header>

        <main className="main-content">
          <div className="card">
            <div className="status-indicator">
              <div className={`status-dot ${error ? 'error' : 'success'}`} />
              <span>{error ? 'Déconnecté' : 'Connecté'}</span>
            </div>

            <div className="message-container">
              <h2>Message du backend</h2>
              <div className="message-box">
                <p className="message-text">{message}</p>
              </div>
            </div>

            {error && (
              <div className="error-container">
                <p className="error-message">{error}</p>
              </div>
            )}

            <button 
              onClick={testBackend}
              className={`test-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner" />
              ) : (
                'Tester la connexion'
              )}
            </button>
          </div>
        </main>

        <footer className="app-footer">
          <p>© 2024 Projet CI/CD Simple - Déployé avec ❤️</p>
        </footer>
      </div>
    </div>
  )
}

export default App
