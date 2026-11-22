const app = require('./app');

// Configurable port via environment variable, defaulting to 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`TaskFlow server is running on http://localhost:${PORT}`);
});
