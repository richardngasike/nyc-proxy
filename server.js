const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Proxy server is healthy, Kudos Wizartech a.k.a Richard Ngasike');
});

// Proxy configuration
const proxyOptions = {
  target: process.env.TARGET_URL || 'https://www.google.com', // Default target
  changeOrigin: true, // Changes the origin of the host header to the target URL
  logLevel: 'debug', // For debugging
};

// Apply proxy middleware to all routes except /health
app.use('/', createProxyMiddleware(proxyOptions));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
