# Countries REST API

A simple REST API for retrieving country information based on ISO 3166-1 standard. This API provides country data including names, codes, emojis, and detailed information.

## 🌐 Features

- Get all countries
- Get specific country
- Get detailed country information
- Health check

## 📦 Technologies

- Node.js
- Express
- i18n-iso-countries
- ISO 3166-1 standard
- REST API
- JSON

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/alphaolomi/countries-restapi.git
cd countries-restapi

# Install dependencies
npm install

# Start the server
npm start
```

The API will be available at `http://localhost:3000` (or the port specified in the PORT environment variable).


## 🔍 Research
- [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1)
- [i18n-iso-countries](https://www.npmjs.com/package/i18n-iso-countries)
- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [JSON](https://www.json.org/json-en.html)
- [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer)
- [Country.js](https://country.js.org/)

## 📚 API Endpoints

### Get All Countries

Retrieve a list of all countries with basic information.

**Endpoint:** `GET /countries`

**cURL Example:**
```bash
curl -X GET http://localhost:3000/countries
```

**Response:**
```json
[
  {
    "id": "AD",
    "name": "Andorra",
    "emoji": "🇦🇩"
  },
  {
    "id": "AE",
    "name": "United Arab Emirates",
    "emoji": "🇦🇪"
  }
]
```

### Get Specific Country

Retrieve information for a specific country by its ISO 3166-1 alpha-2 code.

**Endpoint:** `GET /countries/:code`

**cURL Example:**
```bash
curl -X GET http://localhost:3000/countries/US
```

**Response:**
```json
{
  "id": "US",
  "name": "United States of America",
  "emoji": "🇺🇸"
}
```

### Get Detailed Country Information

Retrieve comprehensive information for a specific country including alpha-2, alpha-3, and numeric codes.

**Endpoint:** `GET /countries/:code/details`

**cURL Example:**
```bash
curl -X GET http://localhost:3000/countries/US/details
```

**Response:**
```json
{
  "id": "US",
  "name": "United States of America",
  "emoji": "🇺🇸",
  "alpha2": "US",
  "alpha3": "USA",
  "numeric": "840"
}
```

### Health Check

Check if the API is running and responsive.

**Endpoint:** `GET /health`

**cURL Example:**
```bash
curl -X GET http://localhost:3000/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔧 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `404` - Country not found
- `500` - Internal server error

**Error Response Example:**
```json
{
  "error": "Country not found"
}
```

## 📋 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report

## 🌍 Country Codes

This API uses ISO 3166-1 alpha-2 country codes (e.g., "US", "GB", "DE"). You can find a complete list of valid codes in the [ISO 3166-1 standard](https://en.wikipedia.org/wiki/ISO_3166-1).

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for testing with comprehensive test coverage:

- **Unit Tests**: All API endpoints are tested
- **Mocking**: External dependencies are properly mocked
- **Coverage**: Test coverage reports are generated
- **CI/CD**: Automated testing via GitHub Actions

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## 📦 Dependencies

This project relies on the [i18n-iso-countries](https://www.npmjs.com/package/i18n-iso-countries) package for country data and ISO 3166-1 standard compliance. The package provides comprehensive country information including names, codes, and locale support.

### Testing Dependencies

- **Vitest**: Fast unit testing framework
- **Supertest**: HTTP assertion library for API testing
- **@vitest/coverage-v8**: Coverage reporting

## 📝 License

This project is licensed under the [MIT License](http://opensource.org/licenses/MIT).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🚀 CI/CD

This project includes automated CI/CD via GitHub Actions:

- **Automated Testing**: Runs on Node.js 18.x, 20.x, and 22.x
- **Coverage Reports**: Generates and uploads test coverage
- **Security Audits**: Automated dependency vulnerability scanning
- **Multi-Platform**: Tests on Ubuntu, Windows, and macOS

## 📧 Contact

Alpha Olomi - alphaolomi@gmail.com

Project Link: [https://github.com/alphaolomi/countries-restapi](https://github.com/alphaolomi/countries-restapi)