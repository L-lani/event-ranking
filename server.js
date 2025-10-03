// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.static('public')); // HTML 파일을 public 폴더에서 제공

// 프록시 API
app.get('/api-proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send({ error: 'URL is required' });

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).send({ error: 'API fetch failed', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
