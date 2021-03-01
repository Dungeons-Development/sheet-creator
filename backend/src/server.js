const express = require('express');
const morgan = require('morgan');
const os = require('os');
const path = require('path');
const pug = require('pug');
const crypto = require('crypto');
const url = require('url');

const app = express();
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const server = app.listen(parseInt(process.env.PORT || 3000, 10));

app.get('/', (req, res) => res.render('frontend', {
  FRONTEND_ASSET_PATH: process.env.FRONTEND_ASSET_PATH
}));

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
