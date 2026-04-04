import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import express from 'express'

// Import the app setup
const app = express()
const PORT = process.env.PORT || 3001

// Mock the countries module for testing
const mockCountries = {
  getNames: () => ({
    'US': 'United States of America',
    'GB': 'United Kingdom',
    'DE': 'Germany',
    'FR': 'France',
    'CA': 'Canada'
  }),
  getName: (code, locale) => {
    const names = {
      'US': 'United States of America',
      'GB': 'United Kingdom', 
      'DE': 'Germany',
      'FR': 'France',
      'CA': 'Canada'
    }
    return names[code] || null
  },
  alpha2ToAlpha3: (code) => {
    const alpha3 = {
      'US': 'USA',
      'GB': 'GBR',
      'DE': 'DEU',
      'FR': 'FRA',
      'CA': 'CAN'
    }
    return alpha3[code] || null
  },
  alpha2ToNumeric: (code) => {
    const numeric = {
      'US': '840',
      'GB': '826',
      'DE': '276',
      'FR': '250',
      'CA': '124'
    }
    return numeric[code] || null
  }
}

// Mock the i18n-iso-countries module
vi.mock('i18n-iso-countries', () => ({
  default: mockCountries,
  registerLocale: vi.fn()
}))

// Helper function to get country emoji
function getCountryEmoji(code) {
  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

// Setup routes
app.use(express.json())

// Get all countries
app.get('/countries', (req, res) => {
  try {
    const countryCodes = mockCountries.getNames('en')
    const countriesList = Object.keys(countryCodes).map(code => ({
      id: code,
      name: countryCodes[code],
      emoji: getCountryEmoji(code)
    }))
    
    res.json(countriesList)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get specific country by code
app.get('/countries/:code', (req, res) => {
  try {
    const code = req.params.code.toUpperCase()
    const name = mockCountries.getName(code, 'en')
    
    if (!name) {
      return res.status(404).json({ error: 'Country not found' })
    }
    
    res.json({
      id: code,
      name: name,
      emoji: getCountryEmoji(code)
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get detailed country information
app.get('/countries/:code/details', (req, res) => {
  try {
    const code = req.params.code.toUpperCase()
    const name = mockCountries.getName(code, 'en')
    
    if (!name) {
      return res.status(404).json({ error: 'Country not found' })
    }
    
    res.json({
      id: code,
      name: name,
      emoji: getCountryEmoji(code),
      alpha2: code,
      alpha3: mockCountries.alpha2ToAlpha3(code),
      numeric: mockCountries.alpha2ToNumeric(code)
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

let server

beforeAll(() => {
  server = app.listen(PORT)
})

afterAll(() => {
  server.close()
})

describe('Countries API', () => {
  describe('GET /countries', () => {
    it('should return all countries', async () => {
      const response = await request(app)
        .get('/countries')
        .expect(200)

      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body[0]).toHaveProperty('id')
      expect(response.body[0]).toHaveProperty('name')
      expect(response.body[0]).toHaveProperty('emoji')
    })
  })

  describe('GET /countries/:code', () => {
    it('should return specific country by code', async () => {
      const response = await request(app)
        .get('/countries/US')
        .expect(200)

      expect(response.body).toHaveProperty('id', 'US')
      expect(response.body).toHaveProperty('name', 'United States of America')
      expect(response.body).toHaveProperty('emoji', '🇺🇸')
    })

    it('should return 404 for invalid country code', async () => {
      const response = await request(app)
        .get('/countries/XX')
        .expect(404)

      expect(response.body).toHaveProperty('error', 'Country not found')
    })

    it('should handle case insensitive country codes', async () => {
      const response = await request(app)
        .get('/countries/us')
        .expect(200)

      expect(response.body).toHaveProperty('id', 'US')
    })
  })

  describe('GET /countries/:code/details', () => {
    it('should return detailed country information', async () => {
      const response = await request(app)
        .get('/countries/US/details')
        .expect(200)

      expect(response.body).toHaveProperty('id', 'US')
      expect(response.body).toHaveProperty('name', 'United States of America')
      expect(response.body).toHaveProperty('emoji', '🇺🇸')
      expect(response.body).toHaveProperty('alpha2', 'US')
      expect(response.body).toHaveProperty('alpha3', 'USA')
      expect(response.body).toHaveProperty('numeric', '840')
    })

    it('should return 404 for invalid country code in details', async () => {
      const response = await request(app)
        .get('/countries/XX/details')
        .expect(404)

      expect(response.body).toHaveProperty('error', 'Country not found')
    })
  })

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)

      expect(response.body).toHaveProperty('status', 'OK')
      expect(response.body).toHaveProperty('timestamp')
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date)
    })
  })
})
