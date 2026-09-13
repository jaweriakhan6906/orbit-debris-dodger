const app = require('./app');

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Orbit Debris Dodger API listening on http://localhost:${PORT}`);
});
