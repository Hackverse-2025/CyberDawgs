from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "*"}})  # Allow all origins

genai.configure(api_key="AIzaSyCbx-aFssrg7PdNhUPBRSt1Ady6iNyLJVI")
model = genai.GenerativeModel("gemini-1.5-flash-8b")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    query = data.get("query")

    if not query:
        return jsonify({"error": "No query provided"}), 400

    try:
        response = model.generate_content(query)
        return jsonify({"response": response.text if hasattr(response, 'text') else "Error: No response from API"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
