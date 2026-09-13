const VALID_BANDS = ['LEO', 'MEO', 'GEO'];

function validateLaunch(req, res, next){
  const { name, band, altKm, inclDeg, raanDeg } = req.body;

  if (typeof name !== 'string' || name.trim().length === 0){
    return res.status(400).json({ success: false, message: 'Field "name" is required and cannot be empty.' });
  }
  if (name.length > 60){
    return res.status(400).json({ success: false, message: 'Field "name" must be 60 characters or fewer.' });
  }
  if (!VALID_BANDS.includes(band)){
    return res.status(400).json({ success: false, message: `Field "band" must be one of: ${VALID_BANDS.join(', ')}.` });
  }
  if (typeof altKm !== 'number' || altKm <= 0 || altKm > 200000){
    return res.status(400).json({ success: false, message: 'Field "altKm" must be a positive number under 200000.' });
  }
  if (typeof inclDeg !== 'number' || inclDeg < 0 || inclDeg > 180){
    return res.status(400).json({ success: false, message: 'Field "inclDeg" must be a number between 0 and 180.' });
  }
  if (typeof raanDeg !== 'number' || raanDeg < 0 || raanDeg >= 360){
    return res.status(400).json({ success: false, message: 'Field "raanDeg" must be a number between 0 and 360.' });
  }

  next();
}

function validateIncident(req, res, next){
  const { description } = req.body;
  if (typeof description !== 'string' || description.trim().length === 0){
    return res.status(400).json({ success: false, message: 'Field "description" is required and cannot be empty.' });
  }
  if (description.length > 300){
    return res.status(400).json({ success: false, message: 'Field "description" must be 300 characters or fewer.' });
  }
  next();
}

module.exports = { validateLaunch, validateIncident };
