import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState<string>('Loading...')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const backendUrl = 'https://ci-cd-project-kpbu.onrender.com'

  const testBackend = async () => {
    console.log('Bouton cliqué, début de testBackend')
    setIsLoading(true)
    console.log('État isLoading mis à true')
    
    try {
      console.log('Tentative de connexion au backend...')
      console.log('URL du backend:', `${backendUrl}/api/hello`)
      
      const response = await axios.get(`${backendUrl}/api/hello`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Réponse reçue:', response)
      console.log('Données de la réponse:', response.data)
      
      setMessage(response.data.message)
      setError('')
      console.log('Message mis à jour:', response.data.message)
    } catch (err) {
      console.error('Erreur détaillée:', err)
      if (axios.isAxiosError(err)) {
        console.error('Statut de l\'erreur:', err.response?.status)
        console.error('Message d\'erreur:', err.message)
        setError(`Erreur: ${err.message} - ${err.response?.status} ${err.response?.statusText}`)
      } else {
        console.error('Erreur inconnue:', err)
        setError(`Erreur: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
      setMessage('Failed to connect to backend')
    } finally {
      setIsLoading(false)
      console.log('État isLoading mis à false')
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
      padding: '2rem',
      background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
      color: 'white'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <header style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2563eb, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            Projet CI/CD Simple
          </h1>
          <p style={{
            color: '#9ca3af',
            fontSize: '1.1rem'
          }}>
            Démonstration d'une application moderne
          </p>
        </header>

        <div style={{
          background: '#2d2d2d',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s, box-shadow 0.3s'
        }}>
          <div style={{
            marginBottom: '2rem'
          }}>
            <h2 style={{
              color: '#9ca3af',
              fontSize: '1rem',
              marginBottom: '0.5rem'
            }}>
              Message du backend
            </h2>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#2563eb'
              }}>
                {message}
              </p>
            </div>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              border: '1px solid #ef4444'
            }}>
              <p style={{
                color: '#ef4444',
                fontSize: '0.9rem'
              }}>
                {error}
              </p>
            </div>
          )}

          <button 
            onClick={() => {
              console.log('Bouton cliqué')
              testBackend()
            }}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.3s, transform 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Chargement...' : 'Tester la connexion'}
          </button>
        </div>

        <footer style={{
          textAlign: 'center',
          marginTop: '3rem',
          color: '#9ca3af',
          fontSize: '0.9rem'
        }}>
          <p>© 2024 Projet CI/CD Simple - Déployé avec ❤️</p>
        </footer>
      </div>
    </div>
  )
}

export default App
