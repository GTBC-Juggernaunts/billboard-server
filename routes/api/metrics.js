const router = require('express').Router();
const metricsController = require('../../controllers/metricsController');

// /api/metrics

router
  // get count of redemptions by promotion id
  .route('/redxpr')
  .get(metricsController.getRedemptionCountByPromo);

router
  // get count of promotions by category
  .route('/prxprg')
  .get(metricsController.getPromotionsByPreferenceGrp);

module.exports = router;