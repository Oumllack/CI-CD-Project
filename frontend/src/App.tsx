import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './App.module.css'

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
    <div className={styles.container}>
      <h1>Projet CI/CD Simple</h1>
      <p>Message du backend: {message}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button 
        onClick={testBackend}
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Chargement...' : 'Tester la connexion'}
      </button>
    </div>
  )
}

export default App
