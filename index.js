const express = require('express');
const countries = require('i18n-iso-countries');

// Register English locale
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


// Index endpoint
app.get('/', (req, res) => {
  res.json([
    { path: '/countries', method: 'GET', description: 'Get all countries' },
    { path: '/countries/:code', method: 'GET', description: 'Get specific country' },
    { path: '/countries/:code/details', method: 'GET', description: 'Get detailed country info' },
    { path: '/health', method: 'GET', description: 'Health check' }
  ]);
});

// Get all countries
app.get('/countries', (req, res) => {
  try {
    const countryCodes = countries.getNames('en');
    const countriesList = Object.keys(countryCodes).map(code => ({
      id: code,
      name: countryCodes[code],
      emoji: getCountryEmoji(code)
    }));
    
    res.json(countriesList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific country by code
app.get('/countries/:code', (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const name = countries.getName(code, 'en');
    
    if (!name) {
      return res.status(404).json({ error: 'Country not found' });
    }
    
    res.json({
      id: code,
      name: name,
      emoji: getCountryEmoji(code)
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get detailed country information
app.get('/countries/:code/details', (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const name = countries.getName(code, 'en');
    
    if (!name) {
      return res.status(404).json({ error: 'Country not found' });
    }
    
    res.json({
      id: code,
      name: name,
      emoji: getCountryEmoji(code),
      alpha2: code,
      alpha3: countries.alpha2ToAlpha3(code),
      numeric: countries.alpha2ToNumeric(code)
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to get country emoji
function getCountryEmoji(code) {
  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Countries REST API running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET /countries - Get all countries`);
  console.log(`  GET /countries/:code - Get specific country`);
  console.log(`  GET /countries/:code/details - Get detailed country info`);
  console.log(`  GET /health - Health check`);
});
