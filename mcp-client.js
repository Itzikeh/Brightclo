require('dotenv').config();
const { MCP } = require('@brightdata/mcp');

// פונקציה ליצירת מופע MCP עם הפרטים שסופקו
function createMcpClient() {
  return new MCP({
    apiToken: process.env.API_TOKEN,
    webUnlockerZone: process.env.WEB_UNLOCKER_ZONE,
    browserAuth: process.env.BROWSER_AUTH
  });
}

// פונקציה לביצוע בקשת חיפוש
async function searchWithMcp(query) {
  const mcp = createMcpClient();
  
  try {
    console.log(`Searching for: ${query}`);
    
    // יצירת בקשה
    const request = {
      url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };
    
    // ביצוע הבקשה
    const response = await mcp.fetch(request);
    
    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    
    const content = await response.text();
    return content;
  } catch (error) {
    console.error('MCP search error:', error);
    throw error;
  }
}

// פונקציה ייעודית לחיפוש מידע על מניות
async function getStockInfo(symbol) {
  try {
    const query = `${symbol} stock price`;
    const htmlContent = await searchWithMcp(query);
    
    return {
      symbol,
      rawData: htmlContent.substring(0, 5000),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error getting stock info for ${symbol}:`, error);
    throw error;
  }
}

module.exports = {
  searchWithMcp,
  getStockInfo
};