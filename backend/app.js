const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


app.post('/ask', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('http://localhost:5000/ask', { message });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
});


app.post('/tts', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5001/tts', req.body, {
      responseType: 'stream',
    });

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'attachment; filename="speech.mp3"');
    response.data.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'TTS request failed', details: err.message });
  }
});


app.post('/image', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5002/generate-image', req.body, {
      responseType: 'stream', // for binary image stream
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'inline; filename="image.png"');
    response.data.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Image generation failed', details: err.message });
  }
});

app.listen(3000, () => {
  console.log('Node.js app listening on port 3000');
});

