require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// טיפול שגיאות מורחב
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();
const PORT = process.env.PORT || 3000;

// מידלוור
app.use(cors());
app.use(express.json());

// נקודת קצה בסיסית
app.get('/', (req, res) => {
  res.send('Simple Search Server is running. Use /search?q=QUERY to search.');
});

// נקודת קצה לחיפוש כללי
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    console.log(`Searching for: ${query}`);
    
    // שימוש ב-API של גוגל לחיפוש
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    try {
      const response = await axios.get(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000 // הגדרת timeout של 10 שניות
      });
      
      // החזרת תוצאות החיפוש
      res.send(response.data);
    } catch (error) {
      console.error('Search request error:', error.message);
      res.status(500).json({ 
        error: 'Error fetching search results',
        message: error.message
      });
    }
  } catch (error) {
    console.error('General error:', error.message);
    res.status(500).json({ 
      error: 'An error occurred',
      message: error.message
    });
  }
});

// נקודת קצה ספציפית למידע על מניות
app.get('/stock/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    if (!symbol) {
      return res.status(400).json({ error: 'Stock symbol is required' });
    }
    
    const query = `${symbol} stock price`;
    console.log(`Searching for stock info: ${query}`);
    
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    try {
      const response = await axios.get(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000 // הגדרת timeout של 10 שניות
      });
      
      res.json({
        symbol,
        html: response.data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Stock info request error:', error.message);
      res.status(500).json({ 
        error: 'Error fetching stock information',
        message: error.message 
      });
    }
  } catch (error) {
    console.error('General error:', error.message);
    res.status(500).json({ 
      error: 'An error occurred',
      message: error.message
    });
  }
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
