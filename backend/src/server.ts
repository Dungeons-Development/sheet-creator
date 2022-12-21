import express from 'express';
import morgan from 'morgan';
import path from 'path';

const app = express();
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());

const PORT = parseInt(process.env.PORT || '3000', 10);
const server = app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
