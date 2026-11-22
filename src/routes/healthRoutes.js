const express = require('express');
const router = express.Router();

/**
 * GET /health
 * Returns application health status.
 */
router.get('/', (req, res) => {
  return res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
