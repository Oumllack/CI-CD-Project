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
    r"/*": {
        "origins": ["*"],
        "methods": ["GET", "POST", "OPTIONS", "HEAD"],
        "allow_headers": ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
        "expose_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True,
        "max_age": 3600
    }
})

@app.route('/')
def root():
    logger.info("Root endpoint called")
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
    logger.info(f"Starting Flask application on port {port}")
    logger.info(f"Environment: {os.environ.get('FLASK_ENV', 'development')}")
    app.run(host='0.0.0.0', port=port, debug=False)  # Désactiver le mode debug en production 