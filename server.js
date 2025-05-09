const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const http = require('http');

// Load environment variables
dotenv.config();

const app = express();

// Root route for debugging
app.get('/', (req, res) => {
  res.send('Proxy server is running. Kudos richyICT.');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Proxy server is healthy');
});

// Proxy configuration
const proxyOptions = {
  target: process.env.TARGET_URL || 'https://www.google.com',
  changeOrigin: true,
  logLevel: 'debug',
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error: ' + err.message);
  },
  onProxyReq: (proxyReq, req, res) => {
    if (req.method === 'CONNECT') {
      // Handle CONNECT method for HTTPS tunneling
      res.writeHead(200, { 'Connection': 'keep-alive' });
      res.end();
    }
  },
};

// Apply proxy middleware to /proxy route
app.use('/proxy', createProxyMiddleware(proxyOptions));

// Start server
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
