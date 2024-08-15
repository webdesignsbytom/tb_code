import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import { join } from 'path';
import * as url from 'url';
import { initializeSocket } from './services/socketManager.js';
import { config } from './config.js';

// Initialize Express
const app = express();
app.disable('x-powered-by');

// Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, config.socketOptions);

// Socket.IO event handling
initializeSocket(io);

// Set the port and URL
const PORT = process.env.PORT || 4000;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Serve static files or HTML
app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: join(__dirname, 'views'),
  });
});

// 404 handler for unknown routes
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

// Global error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Server error event' });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
