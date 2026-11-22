const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Route registrations
app.use('/health', healthRoutes);
app.use('/api/tasks', taskRoutes);

// Fallback 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
