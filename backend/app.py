from flask import Flask, jsonify, redirect
from flask_cors import CORS
import logging
import os

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Configuration CORS plus permissive
CORS(app, resources={
    r"/api/*": {
        "origins": ["*"],  # Permettre toutes les origines
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/')
def root():
    return redirect('/api/hello')

@app.route('/api/hello', methods=['GET'])
def hello():
    try:
        logger.info("Hello endpoint called")
        return jsonify({"message": "Hello from Flask!"})
    except Exception as e:
        logger.error(f"Error in hello endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    logging.info(f"Starting Flask application on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)  # Désactiver le mode debug en production 