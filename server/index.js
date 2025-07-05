import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'public');

app.use(cors());
app.use(express.static(publicPath));

// Wallhaven API proxy
app.get('/api/wallpapers', async (req, res) => {
  const { page = 1, q = '' } = req.query;

  try {
    const response = await axios.get('https://wallhaven.cc/api/v1/search', {
      params: {
        apikey: process.env.WALLHAVEN_API_KEY,
        page,
        per_page: 24,
        categories: '111',
        purity: '100',
        sorting: 'date_added',
        order: 'desc',
        q,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch wallpapers' });
  }
});

// Handle SPA routing fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
