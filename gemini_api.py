from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

GEMINI_API_KEY = ""
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

@app.route('/ask', methods=['POST'])
def ask_gemini():
    user_input = request.json.get('message')
    
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    payload = {
        "contents": [{
            "parts": [{"text": user_input}]
        }]
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(GEMINI_URL, json=payload, headers=headers)
    
    if response.status_code == 200:
        try:
            text = response.json()['candidates'][0]['content']['parts'][0]['text']
            return jsonify({"response": text})
        except Exception:
            return jsonify({"error": "Unexpected response format", "raw": response.json()})
    else:
        return jsonify({"error": "Gemini API error", "details": response.text}), response.status_code

if __name__ == '__main__':
    app.run(debug=True, port=5000)
