const { v4: uuidv4 } = require('uuid');
const { launchStore, incidentStore } = require('../utils/store');

/* ---------------- Launches ---------------- */

// POST /api/launches
function createLaunch(req, res){
  const { name, band, altKm, inclDeg, raanDeg, launchSite } = req.body;

  const record = {
    id: uuidv4(),
    name: name.trim(),
    band,
    altKm,
    inclDeg,
    raanDeg,
    launchSite: launchSite || null,
    createdAt: new Date().toISOString(),
  };
  launchStore.save(record);
  res.status(201).json({ success: true, data: record });
}

// GET /api/launches
function listLaunches(req, res){
  const data = launchStore.findAll();
  res.status(200).json({ success: true, count: data.length, data });
}

// GET /api/launches/:id
function getLaunch(req, res){
  const record = launchStore.findById(req.params.id);
  if (!record) return res.status(404).json({ success: false, message: 'Launch not found.' });
  res.status(200).json({ success: true, data: record });
}

// DELETE /api/launches/:id
function deleteLaunch(req, res){
  const existed = launchStore.remove(req.params.id);
  if (!existed) return res.status(404).json({ success: false, message: 'Launch not found.' });
  res.status(204).send();
}

/* ---------------- Incidents ---------------- */

// POST /api/incidents
function createIncident(req, res){
  const { description, location } = req.body;
  const record = {
    id: uuidv4(),
    description: description.trim(),
    location: location || null,
    createdAt: new Date().toISOString(),
  };
  incidentStore.save(record);
  res.status(201).json({ success: true, data: record });
}

// GET /api/incidents
function listIncidents(req, res){
  const data = incidentStore.findAll();
  res.status(200).json({ success: true, count: data.length, data });
}

/* ---------------- Aggregate stats ---------------- */

// GET /api/stats
function getStats(req, res){
  const launches = launchStore.findAll();
  const incidents = incidentStore.findAll();

  const bandCounts = {};
  launches.forEach(l => { bandCounts[l.band] = (bandCounts[l.band] || 0) + 1; });
  const busiestBand = Object.entries(bandCounts).sort((a, b) => b[1] - a[1])[0];

  res.status(200).json({
    success: true,
    data: {
      totalLaunches: launches.length,
      totalIncidents: incidents.length,
      busiestBand: busiestBand ? busiestBand[0] : null,
      bandCounts,
    },
  });
}

module.exports = {
  createLaunch, listLaunches, getLaunch, deleteLaunch,
  createIncident, listIncidents,
  getStats,
};
