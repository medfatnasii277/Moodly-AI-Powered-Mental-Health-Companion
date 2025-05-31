from flask import Flask, request, send_file, jsonify
from elevenlabs.client import ElevenLabs
import os
import uuid

app = Flask(__name__)


client = ElevenLabs(
    api_key="",
)

@app.route('/tts', methods=['POST'])
def text_to_speech():
    try:
        data = request.get_json()
        text = data.get('text')

        if not text:
            return jsonify({"error": "Text is required"}), 400

     
        audio_stream = client.text_to_speech.convert(
            text=text,
            voice_id="LcfcDJNUP1GQjkzn1xUU",
            model_id="eleven_multilingual_v2",
            output_format="mp3_44100_128",
        )

  
        audio_bytes = b"".join(audio_stream)

      
        filename = f"{uuid.uuid4()}.mp3"
        filepath = os.path.join("temp", filename)
        os.makedirs("temp", exist_ok=True)

        with open(filepath, "wb") as f:
            f.write(audio_bytes)


        return send_file(filepath, mimetype="audio/mpeg", as_attachment=True, download_name="speech.mp3")

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)

