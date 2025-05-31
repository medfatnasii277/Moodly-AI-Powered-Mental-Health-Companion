from flask import Flask, request, send_file, jsonify
import requests
import tempfile
import os

app = Flask(__name__)

CLIPDROP_API_KEY = ""
CLIPDROP_URL = "https://clipdrop-api.co/text-to-image/v1"

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.get_json()
    prompt = data.get("prompt")

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
       
        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp_file:
            response = requests.post(
                CLIPDROP_URL,
                headers={"x-api-key": CLIPDROP_API_KEY},
                files={"prompt": (None, prompt)},
                stream=True
            )
            if response.status_code != 200:
                return jsonify({"error": "Failed to generate image", "details": response.text}), 500

          
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    tmp_file.write(chunk)

            tmp_file_path = tmp_file.name

        return send_file(tmp_file_path, mimetype='image/png', as_attachment=False)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if 'tmp_file_path' in locals() and os.path.exists(tmp_file_path):
            os.remove(tmp_file_path)

if __name__ == '__main__':
    app.run(port=5002)
