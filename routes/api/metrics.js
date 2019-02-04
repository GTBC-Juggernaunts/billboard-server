const router = require('express').Router();
const metricsController = require('../../controllers/metricsController');

// /api/metrics

router
  // get count of redemptions by promotion id
  .route('/redxpr')
  .get(metricsController.getRedemptionCountByPromo);

module.exports = router;