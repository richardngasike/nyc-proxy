const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Proxy configuration
const proxyOptions = {
  target: process.env.TARGET_URL || 'https://www.google.com', // Default target
  changeOrigin: true, // Changes the origin of the host header to the target URL
  logLevel: 'debug', // For debugging
};

// Create proxy middleware
app.use('/', createProxyMiddleware(proxyOptions));

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).send('Proxy server is healthy, kudos wizaetech');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});