const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/search', (req, res) => {
  const query = req.query.q || 'No query provided';
  res.send(`You searched for: ${query}`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

      
