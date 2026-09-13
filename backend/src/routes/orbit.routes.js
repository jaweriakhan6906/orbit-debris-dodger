const express = require('express');
const router = express.Router();

const {
  createLaunch, listLaunches, getLaunch, deleteLaunch,
  createIncident, listIncidents,
  getStats,
} = require('../controllers/orbit.controller');
const { validateLaunch, validateIncident } = require('../middleware/validate');

router.post('/launches', validateLaunch, createLaunch);
router.get('/launches', listLaunches);
router.get('/launches/:id', getLaunch);
router.delete('/launches/:id', deleteLaunch);

router.post('/incidents', validateIncident, createIncident);
router.get('/incidents', listIncidents);

router.get('/stats', getStats);

module.exports = router;
