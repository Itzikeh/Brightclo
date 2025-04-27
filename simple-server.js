const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

// הפעלת CORS כדי לאפשר בקשות מדומיינים שונים
app.use(cors());

// מידלוור בסיסי
app.use(express.json());

// נקודת קצה בסיסית
app.get('/', (req, res) => {
  res.send('Simple Search Server is running. Use /search?q=QUERY to search.');
});

// נקודת קצה לבדיקת בריאות
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// נקודת קצה לחיפוש - גרסה פשוטה
app.get('/search', (req, res) => {
  const query = req.query.q || 'No query provided';
  
  // נחזיר תשובה פשוטה במקום לבצע חיפוש אמיתי
  if (query.includes('TEVA') || query.includes('teva')) {
    res.json({
      query: query,
      results: {
        stockSymbol: "TEVA",
        price: "$13.45", // ערך לדוגמה
        change: "+0.32 (2.4%)", // ערך לדוגמה
        timestamp: new Date().toISOString()
      }
    });
  } else {
    res.json({
      query: query,
      message: "Search results would appear here",
      timestamp: new Date().toISOString()
    });
  }
});

// נקודת קצה ספציפית למניות
app.get('/stock/:symbol', (req, res) => {
  const { symbol } = req.params;
  
  if (symbol.toUpperCase() === 'TEVA') {
    res.json({
      symbol: "TEVA",
      price: "$13.45", // ערך לדוגמה
      change: "+0.32 (2.4%)", // ערך לדוגמה
      timestamp: new Date().toISOString()
    });
  } else {
    res.json({
      symbol: symbol,
      message: "Stock information would appear here",
      timestamp: new Date().toISOString()
    });
  }
});

// הגדרת האזנה על כל הממשקים (חשוב בסביבת ענן)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
      
