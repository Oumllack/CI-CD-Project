# Projet CI/CD Simple

Une application web simple avec un backend Flask et un frontend React, configurée pour le déploiement continu sur Render et Vercel.

## Structure du projet

- `backend/` : Application Flask
- `frontend/` : Application React
- `docker-compose.yml` : Configuration Docker pour l'environnement de développement
- `render.yaml` : Configuration pour le déploiement sur Render
- `frontend/vercel.json` : Configuration pour le déploiement sur Vercel

## Prérequis

- Docker
- Docker Compose
- Node.js (pour le développement local)
- Python 3.9+ (pour le développement local)

## Installation locale

1. Cloner le repository
2. Construire les images Docker :
   ```bash
   docker-compose build
   ```
3. Démarrer les services :
   ```bash
   docker-compose up
   ```

## Développement local

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Déploiement

Le projet est configuré pour être déployé automatiquement :

- Backend : Render (https://render.com)
- Frontend : Vercel (https://vercel.com)

### Configuration des secrets GitHub

Les secrets suivants doivent être configurés dans les paramètres de votre repository GitHub :

- `RENDER_SERVICE_ID` : ID du service Render
- `RENDER_API_KEY` : Clé API Render
- `VERCEL_TOKEN` : Token Vercel
- `VERCEL_ORG_ID` : ID de l'organisation Vercel
- `VERCEL_PROJECT_ID` : ID du projet Vercel
- `DOCKERHUB_USERNAME` : Nom d'utilisateur Docker Hub
- `DOCKERHUB_TOKEN` : Token Docker Hub

## URLs de production

- Backend : https://flask-backend.onrender.com
- Frontend : https://[votre-projet].vercel.app

## Licence

MIT 