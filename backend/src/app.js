const express = require('express');
const cors = require('cors');

const orbitRoutes = require('./routes/orbit.routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Orbit Debris Dodger API is running.',
    endpoints: [
      'POST /api/launches',
      'GET /api/launches',
      'GET /api/launches/:id',
      'DELETE /api/launches/:id',
      'POST /api/incidents',
      'GET /api/incidents',
      'GET /api/stats',
    ],
  });
});

app.use('/api', orbitRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

app.use(errorHandler);

module.exports = app;
