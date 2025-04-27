require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { searchWithMcp, getStockInfo } = require('./mcp-client');

const app = express();
const PORT = process.env.PORT || 3000;

// מידלוור
app.use(cors());
app.use(express.json());

// נקודת קצה בסיסית
app.get('/', (req, res) => {
  res.send('Bright Data MCP Server is running. Use /search?q=QUERY to search.');
});

// נקודת קצה לחיפוש כללי
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const result = await searchWithMcp(query);
    res.send(result);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'An error occurred during search', message: error.message });
  }
});

// נקודת קצה למידע על מניות
app.get('/stock/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    if (!symbol) {
      return res.status(400).json({ error: 'Stock symbol is required' });
    }
    
    const stockInfo = await getStockInfo(symbol);
    res.json(stockInfo);
  } catch (error) {
    console.error('Stock info error:', error);
    res.status(500).json({ error: 'An error occurred while fetching stock info', message: error.message });
  }
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});