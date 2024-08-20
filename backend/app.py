from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import os
from generate_flashcards import generate_flashcards_from_youtube

# Set up basic configuration for logging
logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": ["http://localhost:3001", "https://notefy.up.railway.app"]}}) # CORS(app, resources={r"/*": {"origins": "https://notefy.up.railway.app"}})

@app.route('/api/generate-flashcards', methods=['POST'])
def generate_flashcards_endpoint():
    data = request.json
    youtube_url = data.get('youtube_url', '')

    if not youtube_url: # If an empty URL is provided
        return jsonify({'error': 'No YouTube URL provided'}), 400
    
    try:
        app.logger.info(f"Received request for URL: {youtube_url}")
        flashcards_json = generate_flashcards_from_youtube(youtube_url) # Generate flashcards in json format
        app.logger.info(f"Generated flashcards: {flashcards_json}")
        return flashcards_json

    except Exception as e:
        error_message = f"Error occurred: {str(e)}"  # For debugging
        print(error_message)
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Use the PORT environment variable or default to 5000
    app.run(host='0.0.0.0', port=port)